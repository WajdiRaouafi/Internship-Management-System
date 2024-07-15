import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidatureService } from '../../services/candidature/candidature.service';
import { Candidature } from '../../models/candidature.model';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast/toast.service'; // Add this import if using ToastService
import { ResponseMessage } from '../../models/ApiResponse.model';



@Component({
  selector: 'app-candidature-create',
  templateUrl: './candidature-create.component.html',
  styleUrls: ['./candidature-create.component.scss']
})
export class CandidatureCreateComponent implements OnInit {
  candidature: Candidature = {
    nivEtude: '',
    etablissement: '',
    specialite: '',
    etatCandidature: 'En attente',
    user: {
      id: 0,
      username: '',
      email: ''
    },
    offres: {
      id: 0,
      intitule: ''
    }
  };

  userId: number = 0;
  offreId: number = 0;
  message: string = ''; // String for the message

  constructor(
    private candidatureService: CandidatureService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastService: ToastService // Inject ToastService if you want to use it
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId();

    // Get offreId from query parameters
    this.route.queryParams.subscribe(params => {
      this.offreId = params['offreId'];
      console.log('Offre ID:', this.offreId);

      if (this.offreId && this.candidature.offres) {
        this.candidature.offres.id = this.offreId;
      }
    });
  }

  onSubmit() {
    if (!this.authService.isLoggedIn) {
      this.message = 'Vous devez vous connecter pour soumettre une candidature.';
      this.toastService.show(this.message);
      return; // Stop the submission process
    }

    this.candidature.user.id = this.userId;

    this.candidatureService.createCandidature(this.candidature, this.userId, this.offreId).subscribe(
      (response: ResponseMessage) => {
        // Assuming a successful submission
        this.message = 'Candidature soumise avec succès !';
        this.toastService.show(this.message);
        this.goToCandidatureList();
      },
      () => {
        // For any error, simply show this message
        this.message = 'Vous avez déjà postulé pour cette offre.';
        this.toastService.show(this.message);
      }
    );
  }

  goToCandidatureList() {
    this.router.navigate(['/candidatures']);
  }
}


  // onSubmit() {
  //   if (!this.authService.isLoggedIn) {
  //     this.message = 'Vous devez vous connecter pour soumettre une candidature.';
  //     this.toastService.show(this.message);
  //     return; // Stop the submission process
  //   }
  
  //   this.candidature.user.id = this.userId;
    
  //   this.candidatureService.createCandidature(this.candidature, this.userId, this.offreId).subscribe(
  //     () => {
  //       // On success
  //       this.message = 'Candidature soumise avec succès !';
  //       this.toastService.show(this.message);
  //       this.goToCandidatureList();
  //     },
  //     error => {
  //       // Handle the error response
  //       let errorMessage = 'Erreur lors de la création de la candidature.';
  //       if (error.status === 409) { // Already submitted
  //         errorMessage = 'Vous avez déjà postulé pour cette offre.';
  //       } else if (error.error && typeof error.error === 'string') {
  //         errorMessage = error.error; // If the server returns a string message
  //       }
  
  //       this.message = errorMessage;
  //       this.toastService.show(this.message);
  //     }
  //   );
  // }

  // onSubmit() {
  //   if (!this.authService.isLoggedIn) {
  //     this.message = 'Vous devez vous connecter pour soumettre une candidature.';
  //     this.toastService.show(this.message);
  //     return; // Stop the submission process
  //   }
  
  //   this.candidature.user.id = this.userId;
  
  //   this.candidatureService.createCandidature(this.candidature, this.userId, this.offreId).subscribe(
  //     (response: ResponseMessage) => {
  //       console.log('Submission response:', response);
  //       this.message = response?.message || 'Candidature soumise avec succès !';
  //       this.toastService.show(this.message);
  //       this.goToCandidatureList();
  //     },
  //     (error) => {
  //       console.error('Submission error:', error);
        
  //       let errorMessage = 'Erreur lors de la création de la candidature.';
  //       if (error.status === 409) {
  //         errorMessage = 'Vous avez déjà postulé pour cette offre.';
  //       } else if (error.error && typeof error.error === 'string') {
  //         errorMessage = error.error; // If the server returns a string message
  //       } else if (error.text) {
  //         errorMessage = error.text; // Capture the text from the error if available
  //       }
  
  //       // Show the detailed error message on the toast
  //       this.message = `Submission error: ${errorMessage}`;
  //       this.toastService.show(this.message); // Show the toast with the detailed message
  //     }
  //   );
  // }
 


