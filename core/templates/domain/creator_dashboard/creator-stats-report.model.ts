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
 * @fileoverview Frontend models for the creator stats report.
 */

export interface CreatorSummaryBackendDict {
  num_explorations: number;
  total_learner_views: number;
  average_exploration_rating: number;
  total_feedback_threads: number;
  average_completion_rate: number;
}

export interface ExplorationStatsBackendDict {
  id: string;
  title: string;
  creation_date_msec: number;
  num_learner_views: number;
  ratings: Record<string, number>;
  average_rating: number;
  completion_rate: number;
  num_feedback_threads: number;
  num_solutions_viewed: number;
  num_hints_used: number;
}

export interface CreatorStatsReportBackendDict {
  creator_summary: CreatorSummaryBackendDict;
  explorations: ExplorationStatsBackendDict[];
}

export class CreatorSummary {
  constructor(
    public numExplorations: number,
    public totalLearnerViews: number,
    public averageExplorationRating: number,
    public totalFeedbackThreads: number,
    public averageCompletionRate: number
  ) {}

  static createFromBackendDict(
    backendDict: CreatorSummaryBackendDict
  ): CreatorSummary {
    return new CreatorSummary(
      backendDict.num_explorations,
      backendDict.total_learner_views,
      backendDict.average_exploration_rating,
      backendDict.total_feedback_threads,
      backendDict.average_completion_rate
    );
  }
}

export class CreatorExplorationStats {
  constructor(
    public id: string,
    public title: string,
    public creationDateMsec: number,
    public numLearnerViews: number,
    public ratings: Record<string, number>,
    public averageRating: number,
    public completionRate: number,
    public numFeedbackThreads: number,
    public numSolutionsViewed: number,
    public numHintsUsed: number
  ) {}

  static createFromBackendDict(
    backendDict: ExplorationStatsBackendDict
  ): CreatorExplorationStats {
    return new CreatorExplorationStats(
      backendDict.id,
      backendDict.title,
      backendDict.creation_date_msec,
      backendDict.num_learner_views,
      backendDict.ratings,
      backendDict.average_rating,
      backendDict.completion_rate,
      backendDict.num_feedback_threads,
      backendDict.num_solutions_viewed,
      backendDict.num_hints_used
    );
  }
}

export class CreatorStatsReport {
  constructor(
    public creatorSummary: CreatorSummary,
    public explorations: CreatorExplorationStats[]
  ) {}

  static createFromBackendDict(
    backendDict: CreatorStatsReportBackendDict
  ): CreatorStatsReport {
    return new CreatorStatsReport(
      CreatorSummary.createFromBackendDict(backendDict.creator_summary),
      backendDict.explorations.map(expDict =>
        CreatorExplorationStats.createFromBackendDict(expDict)
      )
    );
  }
}
