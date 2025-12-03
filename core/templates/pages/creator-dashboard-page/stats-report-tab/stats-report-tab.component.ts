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
 * @fileoverview Component for displaying creator stats report.
 */

import {Component, OnInit} from '@angular/core';
import {CreatorDashboardBackendApiService} from 'domain/creator_dashboard/creator-dashboard-backend-api.service';
import {CreatorStatsReport} from 'domain/creator_dashboard/creator-stats-report.model';
import {LoaderService} from 'services/loader.service';
import {DateTimeFormatService} from 'services/date-time-format.service';

@Component({
  selector: 'oppia-stats-report-tab',
  templateUrl: './stats-report-tab.component.html',
  styleUrls: ['./stats-report-tab.component.css'],
})
export class StatsReportTabComponent implements OnInit {
  // These properties are initialized using Angular lifecycle hooks
  // and we need to do non-null assertion. For more information, see
  // https://github.com/oppia/oppia/wiki/Guide-on-defining-types#ts-7-1
  statsReport!: CreatorStatsReport;
  getLocaleAbbreviatedDatetimeString!: (
    millisSinceEpoch: number
  ) => string;

  constructor(
    private creatorDashboardBackendApiService: CreatorDashboardBackendApiService,
    private loaderService: LoaderService,
    private dateTimeFormatService: DateTimeFormatService
  ) {}

  ngOnInit(): void {
    this.getLocaleAbbreviatedDatetimeString =
      this.dateTimeFormatService.getLocaleAbbreviatedDatetimeString;

    this.loaderService.showLoadingScreen('Loading');
    this.creatorDashboardBackendApiService
      .fetchCreatorStatsReportAsync()
      .then(
        statsReport => {
          this.statsReport = statsReport;
          this.loaderService.hideLoadingScreen();
        },
        errorResponse => {
          this.loaderService.hideLoadingScreen();
          // Error handling can be added here.
          console.error('Error loading stats report:', errorResponse);
        }
      );
  }

  getCompletionRatePercentage(completionRate: number): string {
    return (completionRate * 100).toFixed(2) + '%';
  }

  getAverageRatingDisplay(averageRating: number): string {
    if (averageRating === 0) {
      return 'N/A';
    }
    return averageRating.toFixed(2);
  }
}

