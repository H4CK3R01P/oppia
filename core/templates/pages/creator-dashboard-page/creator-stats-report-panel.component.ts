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

/**
 * @fileoverview Creator dashboard stats report panel shown with mock data.
 */

import {Component, OnInit} from '@angular/core';
import {
  CreatorExplorationStats,
  CreatorStatsReport,
  CreatorSummary,
} from 'domain/creator_dashboard/creator-stats-report.model';
import {CreatorStatsReportBackendApiService} from 'domain/creator_dashboard/creator-stats-report-backend-api.service';

@Component({
  selector: 'oppia-creator-stats-report-panel',
  templateUrl: './creator-stats-report-panel.component.html',
  styleUrls: ['./creator-stats-report-panel.component.css'],
})
export class CreatorStatsReportPanelComponent implements OnInit {
  creatorSummary!: CreatorSummary;
  explorationStats: CreatorExplorationStats[] = [];
  displayedExplorationStats: CreatorExplorationStats[] = [];
  readonly maxExplorationsToShow: number = 3;
  isLoading: boolean = true;
  loadError: string | null = null;

  constructor(
    private creatorStatsReportBackendApiService: CreatorStatsReportBackendApiService
  ) {}

  ngOnInit(): void {
    this.fetchCreatorStatsReport();
  }

  trackExplorationById(
    index: number,
    exploration: CreatorExplorationStats
  ): string {
    return exploration.id;
  }

  private fetchCreatorStatsReport(): void {
    this.isLoading = true;
    this.loadError = null;
    this.creatorStatsReportBackendApiService
      .fetchCreatorStatsReportAsync()
      .then(report => {
        this.populateReport(report);
        this.isLoading = false;
      })
      .catch(() => {
        this.loadError = 'Unable to load creator stats right now.';
        this.isLoading = false;
      });
  }

  private populateReport(report: CreatorStatsReport): void {
    this.creatorSummary = report.creatorSummary;
    this.explorationStats = report.explorations;
    this.displayedExplorationStats = this.explorationStats.slice(
      0,
      this.maxExplorationsToShow
    );
  }
}
