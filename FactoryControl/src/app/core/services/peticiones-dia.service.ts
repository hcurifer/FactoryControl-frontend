import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PeticionesDiaApi } from '../../data-access/api/peticiones-dia.api';
import { PeticionDia, PeticionDiaCreate } from '../../data-access/models/peticion-dia.model';

@Injectable({ providedIn: 'root' })
export class PeticionesDiaService {
  constructor(private api: PeticionesDiaApi) {}

  create(data: PeticionDiaCreate): Observable<PeticionDia> {
    return this.api.create(data);
  }
}
