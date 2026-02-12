import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpresaImages } from '../interfaces/empresa-images';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaImagesService {

  private baseURL =
    'http://localhost:8000/Database/Database/empresaimages/';
  private formato = '?format=json';
  public empresaImagesObtenidas : EmpresaImages[] = [];
  private rutaLogos = 'http://localhost:8000/logos/';
  private rutaBanners = 'http://localhost:8000/banners/';

  constructor(
    private http: HttpClient,
  ) { }

  getImages(): Observable<EmpresaImages[]> {
    const respuesta = this.http.get<EmpresaImages[]>(this.baseURL+this.formato);
    respuesta.forEach((images)=>{
      this.empresaImagesObtenidas = images;
    })
    return respuesta;
  }

  getImagebyId(id?: number): Observable<EmpresaImages> {
    return this.http.get<EmpresaImages>(this.baseURL + id + '/' + this.formato);
  }

  getLogoURLbyEmpresaId(idEmpresa: number, images: EmpresaImages[]): string{
    const image = images.find((image)=> idEmpresa === image.id_empresa && image.estado === 1)
    const arrayURL = String(image?.logo).split('/')
    const URL = arrayURL[arrayURL.length-1]
    return image?this.rutaLogos+URL:'';
  }

  getBannerURLbyEmpresaId(idEmpresa: number, images: EmpresaImages[]): string{
    const image = images.find((image)=> idEmpresa === image.id_empresa && image.estado === 1)
    const arrayURL = String(image?.banner).split('/')
    const URL = arrayURL[arrayURL.length-1]
    return image?this.rutaBanners+URL:'';
  }


}
