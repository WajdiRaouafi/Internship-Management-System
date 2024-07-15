export interface Candidature {
  id?: number; // Remove the optional modifier
  nivEtude: string;
  etablissement: string;
  specialite: string;
  etatCandidature: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
  offres: {
    id: number;
    intitule: string;
  } | null;
}
