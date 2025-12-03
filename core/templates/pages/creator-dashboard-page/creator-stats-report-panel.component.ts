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
  CreatorStatsReportBackendDict,
  CreatorSummary,
} from 'domain/creator_dashboard/creator-stats-report.model';

const MOCK_STATS_REPORT: CreatorStatsReportBackendDict = {
  creator_summary: {
    num_explorations: 3,
    total_learner_views: 18250,
    average_exploration_rating: 4.5,
    total_feedback_threads: 47,
    average_completion_rate: 0.63,
  },
  explorations: [
    {
      id: 'expWelcomeFractions',
      title: 'Fractions: Welcome Tour',
      creation_date_msec: 1546300800000,
      num_learner_views: 7450,
      ratings: {
        '1': 0,
        '2': 3,
        '3': 14,
        '4': 81,
        '5': 162,
      },
      average_rating: 4.6,
      completion_rate: 0.71,
      num_feedback_threads: 17,
      num_solutions_viewed: 36,
      num_hints_used: 82,
    },
    {
      id: 'expEnergyIntro',
      title: 'Energy Conservation Basics',
      creation_date_msec: 1609459200000,
      num_learner_views: 5235,
      ratings: {
        '1': 1,
        '2': 5,
        '3': 22,
        '4': 66,
        '5': 114,
      },
      average_rating: 4.3,
      completion_rate: 0.58,
      num_feedback_threads: 19,
      num_solutions_viewed: 41,
      num_hints_used: 97,
    },
    {
      id: 'expBudget101',
      title: 'Budgeting 101',
      creation_date_msec: 1672444800000,
      num_learner_views: 5565,
      ratings: {
        '1': 2,
        '2': 4,
        '3': 18,
        '4': 52,
        '5': 131,
      },
      average_rating: 4.5,
      completion_rate: 0.59,
      num_feedback_threads: 11,
      num_solutions_viewed: 29,
      num_hints_used: 73,
    },
  ],
};

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

  ngOnInit(): void {
    const mockReport =
      CreatorStatsReport.createFromBackendDict(MOCK_STATS_REPORT);
    this.creatorSummary = mockReport.creatorSummary;
    this.explorationStats = mockReport.explorations;
    this.displayedExplorationStats = this.explorationStats.slice(
      0,
      this.maxExplorationsToShow
    );
  }

  trackExplorationById(
    index: number,
    exploration: CreatorExplorationStats
  ): string {
    return exploration.id;
  }
}
