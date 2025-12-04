import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CreatorDashboardStats} from 'domain/creator_dashboard/creator-dashboard-stats.model';
import {CreatorExplorationSummary} from 'domain/summary/creator-exploration-summary.model';

@Component({
  selector: 'oppia-creator-stats-report-modal',
  templateUrl: './creator-stats-report-modal.component.html',
})
export class CreatorStatsReportModalComponent {
  dashboardStats!: CreatorDashboardStats;
  creatorCompletionRate!: number | null;
  subscribersCount!: number;
  explorationsList!: CreatorExplorationSummary[];

  constructor(private ngbActiveModal: NgbActiveModal) {}

  close(): void {
    this.ngbActiveModal.close();
  }
}
