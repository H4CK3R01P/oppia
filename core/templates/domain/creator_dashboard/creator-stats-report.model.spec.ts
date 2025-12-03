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
 * @fileoverview Unit tests for CreatorStatsReport model.
 */

import {
  CreatorStatsReport,
  CreatorSummary,
  ExplorationStats,
} from './creator-stats-report.model';

describe('CreatorStatsReport model', () => {
  it('should create CreatorSummary from backend dict', () => {
    const backendDict = {
      num_explorations: 2,
      total_learner_views: 100,
      average_exploration_rating: 4.5,
      total_feedback_threads: 10,
      average_completion_rate: 0.75,
    };

    const creatorSummary = CreatorSummary.createFromBackendDict(backendDict);

    expect(creatorSummary.numExplorations).toBe(2);
    expect(creatorSummary.totalLearnerViews).toBe(100);
    expect(creatorSummary.averageExplorationRating).toBe(4.5);
    expect(creatorSummary.totalFeedbackThreads).toBe(10);
    expect(creatorSummary.averageCompletionRate).toBe(0.75);
  });

  it('should create ExplorationStats from backend dict', () => {
    const backendDict = {
      id: 'exp1',
      title: 'Test Exploration',
      creation_date_msec: 1000000000000,
      num_learner_views: 50,
      ratings: {'1': 0, '2': 0, '3': 1, '4': 2, '5': 1},
      average_rating: 4.0,
      completion_rate: 0.8,
      num_feedback_threads: 5,
      num_solutions_viewed: 10,
      num_hints_used: 20,
    };

    const explorationStats = ExplorationStats.createFromBackendDict(
      backendDict
    );

    expect(explorationStats.id).toBe('exp1');
    expect(explorationStats.title).toBe('Test Exploration');
    expect(explorationStats.creationDateMsec).toBe(1000000000000);
    expect(explorationStats.numLearnerViews).toBe(50);
    expect(explorationStats.ratings).toEqual({'1': 0, '2': 0, '3': 1, '4': 2, '5': 1});
    expect(explorationStats.averageRating).toBe(4.0);
    expect(explorationStats.completionRate).toBe(0.8);
    expect(explorationStats.numFeedbackThreads).toBe(5);
    expect(explorationStats.numSolutionsViewed).toBe(10);
    expect(explorationStats.numHintsUsed).toBe(20);
  });

  it('should create CreatorStatsReport from backend dict', () => {
    const backendDict = {
      creator_summary: {
        num_explorations: 2,
        total_learner_views: 100,
        average_exploration_rating: 4.5,
        total_feedback_threads: 10,
        average_completion_rate: 0.75,
      },
      explorations: [
        {
          id: 'exp1',
          title: 'Test Exploration 1',
          creation_date_msec: 1000000000000,
          num_learner_views: 50,
          ratings: {'1': 0, '2': 0, '3': 1, '4': 2, '5': 1},
          average_rating: 4.0,
          completion_rate: 0.8,
          num_feedback_threads: 5,
          num_solutions_viewed: 10,
          num_hints_used: 20,
        },
        {
          id: 'exp2',
          title: 'Test Exploration 2',
          creation_date_msec: 2000000000000,
          num_learner_views: 50,
          ratings: {'1': 0, '2': 0, '3': 0, '4': 1, '5': 1},
          average_rating: 4.5,
          completion_rate: 0.7,
          num_feedback_threads: 5,
          num_solutions_viewed: 15,
          num_hints_used: 25,
        },
      ],
    };

    const statsReport = CreatorStatsReport.createFromBackendDict(backendDict);

    expect(statsReport.creatorSummary.numExplorations).toBe(2);
    expect(statsReport.explorations.length).toBe(2);
    expect(statsReport.explorations[0].id).toBe('exp1');
    expect(statsReport.explorations[1].id).toBe('exp2');
  });
});

