// Copyright 2024 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Unit tests for StatsReportTabComponent.
 */

import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {StatsReportTabComponent} from './stats-report-tab.component';
import {CreatorDashboardBackendApiService} from 'domain/creator_dashboard/creator-dashboard-backend-api.service';
import {LoaderService} from 'services/loader.service';
import {DateTimeFormatService} from 'services/date-time-format.service';
import {CreatorStatsReport} from 'domain/creator_dashboard/creator-stats-report.model';
import {CreatorSummary} from 'domain/creator_dashboard/creator-stats-report.model';
import {ExplorationStats} from 'domain/creator_dashboard/creator-stats-report.model';

describe('StatsReportTabComponent', () => {
  let component: StatsReportTabComponent;
  let fixture: ComponentFixture<StatsReportTabComponent>;
  let creatorDashboardBackendApiService: CreatorDashboardBackendApiService;
  let loaderService: LoaderService;
  let dateTimeFormatService: DateTimeFormatService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StatsReportTabComponent],
      providers: [
        CreatorDashboardBackendApiService,
        LoaderService,
        DateTimeFormatService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsReportTabComponent);
    component = fixture.componentInstance;
    creatorDashboardBackendApiService = TestBed.inject(
      CreatorDashboardBackendApiService
    );
    loaderService = TestBed.inject(LoaderService);
    dateTimeFormatService = TestBed.inject(DateTimeFormatService);

    spyOn(loaderService, 'showLoadingScreen');
    spyOn(loaderService, 'hideLoadingScreen');
    spyOn(
      dateTimeFormatService,
      'getLocaleAbbreviatedDatetimeString'
    ).and.returnValue('Jan 1, 2024');
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should load stats report on init', waitForAsync(() => {
    const mockStatsReport = new CreatorStatsReport(
      new CreatorSummary(2, 100, 4.5, 10, 0.75),
      [
        new ExplorationStats(
          'exp1',
          'Test Exploration 1',
          1000000000000,
          50,
          {'1': 0, '2': 0, '3': 1, '4': 2, '5': 1},
          4.0,
          0.8,
          5,
          10,
          20
        ),
      ]
    );

    spyOn(
      creatorDashboardBackendApiService,
      'fetchCreatorStatsReportAsync'
    ).and.returnValue(Promise.resolve(mockStatsReport));

    component.ngOnInit();

    fixture.whenStable().then(() => {
      expect(component.statsReport).toEqual(mockStatsReport);
      expect(loaderService.showLoadingScreen).toHaveBeenCalledWith('Loading');
      expect(loaderService.hideLoadingScreen).toHaveBeenCalled();
    });
  }));

  it('should handle error when loading stats report', waitForAsync(() => {
    const errorResponse = {error: 'Error loading stats'};
    spyOn(
      creatorDashboardBackendApiService,
      'fetchCreatorStatsReportAsync'
    ).and.returnValue(Promise.reject(errorResponse));
    spyOn(console, 'error');

    component.ngOnInit();

    fixture.whenStable().then(() => {
      expect(loaderService.hideLoadingScreen).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith(
        'Error loading stats report:',
        errorResponse
      );
    });
  }));

  it('should format completion rate as percentage', () => {
    expect(component.getCompletionRatePercentage(0.75)).toBe('75.00%');
    expect(component.getCompletionRatePercentage(0.5)).toBe('50.00%');
    expect(component.getCompletionRatePercentage(0)).toBe('0.00%');
  });

  it('should format average rating display', () => {
    expect(component.getAverageRatingDisplay(4.5)).toBe('4.50');
    expect(component.getAverageRatingDisplay(0)).toBe('N/A');
    expect(component.getAverageRatingDisplay(3.75)).toBe('3.75');
  });
});


