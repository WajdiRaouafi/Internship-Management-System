import { Component, OnInit } from '@angular/core';
import { OffresService } from '../../services/offre/offre.service';
import { Offres } from '../../models/offres.model.ts';

@Component({
  selector: 'app-offres-list',
  templateUrl: './offres-list.component.html',
  styleUrls: ['./offres-list.component.css']
})
export class OffresListComponent implements OnInit {
  offres: Offres[] = [];

  constructor(private offresService: OffresService) { }

  ngOnInit(): void {
    this.getOffres();
  }

  getOffres(): void {
    this.offresService.getAllOffres().subscribe((data: Offres[]) => {
      this.offres = data;
    });
  }

  deleteOffre(id: number): void {
    this.offresService.deleteOffre(id).subscribe(() => {
      this.getOffres(); // Refresh the list
    });
  }
}
