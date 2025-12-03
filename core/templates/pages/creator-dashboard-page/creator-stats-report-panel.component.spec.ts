// Copyright 2025 The Oppia Authors. All Rights Reserved.
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

import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CreatorStatsReportPanelComponent} from './creator-stats-report-panel.component';
import {CreatorStatsReportBackendApiService} from 'domain/creator_dashboard/creator-stats-report-backend-api.service';
import {CreatorStatsReport} from 'domain/creator_dashboard/creator-stats-report.model';

const MOCK_REPORT = CreatorStatsReport.createFromBackendDict({
  creator_summary: {
    num_explorations: 2,
    total_learner_views: 1200,
    average_exploration_rating: 4.5,
    total_feedback_threads: 8,
    average_completion_rate: 0.5,
  },
  explorations: [
    {
      id: 'exp1',
      title: 'Sample exploration',
      creation_date_msec: 1700000000000,
      num_learner_views: 600,
      ratings: {'5': 10},
      average_rating: 4.8,
      completion_rate: 0.6,
      num_feedback_threads: 5,
      num_solutions_viewed: 1,
      num_hints_used: 2,
    },
  ],
});

class MockCreatorStatsReportBackendApiService {
  fetchCreatorStatsReportAsync = jasmine
    .createSpy('fetchCreatorStatsReportAsync')
    .and.returnValue(Promise.resolve(MOCK_REPORT));
}

describe('CreatorStatsReportPanelComponent', () => {
  let component: CreatorStatsReportPanelComponent;
  let fixture: ComponentFixture<CreatorStatsReportPanelComponent>;
  let backendApiService: MockCreatorStatsReportBackendApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatorStatsReportPanelComponent],
      providers: [
        {
          provide: CreatorStatsReportBackendApiService,
          useClass: MockCreatorStatsReportBackendApiService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatorStatsReportPanelComponent);
    component = fixture.componentInstance;
    backendApiService = TestBed.inject(
      CreatorStatsReportBackendApiService
    ) as unknown as MockCreatorStatsReportBackendApiService;
  });

  it('should load stats report from backend', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(backendApiService.fetchCreatorStatsReportAsync).toHaveBeenCalled();
    expect(component.isLoading).toBeFalse();
    expect(component.creatorSummary.numExplorations).toEqual(2);
    expect(component.displayedExplorationStats.length).toBeGreaterThan(0);
  }));

  it('should show error message when backend fails', fakeAsync(() => {
    backendApiService.fetchCreatorStatsReportAsync.and.returnValue(
      Promise.reject()
    );

    fixture.detectChanges();
    tick();

    expect(component.loadError).toBeTruthy();
    expect(component.isLoading).toBeFalse();
  }));
});
