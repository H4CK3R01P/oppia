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

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CreatorStatsReportPanelComponent} from './creator-stats-report-panel.component';

describe('CreatorStatsReportPanelComponent', () => {
  let component: CreatorStatsReportPanelComponent;
  let fixture: ComponentFixture<CreatorStatsReportPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatorStatsReportPanelComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatorStatsReportPanelComponent);
    component = fixture.componentInstance;
  });

  it('should initialise mock report for preview', () => {
    fixture.detectChanges();

    expect(component.creatorSummary).toBeDefined();
    expect(component.displayedExplorationStats.length).toBeGreaterThan(0);
  });
});
