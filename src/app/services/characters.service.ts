import { Injectable } from '@angular/core';
import { Character } from '../interfaces/explorer.interface';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private explorerName: string = '';
  private doctorName: string = '';
  private engineerName: string = '';

  private explorer: Character | undefined;
  private doctor: Character | undefined;
  private engineer: Character | undefined;

  setExplorerName(name: string) {
    this.explorerName = name;
  }

  getExplorerName(): string {
    return this.explorerName;
  }

  setDoctorName(name: string) {
    this.doctorName = name;
  }

  getDoctorName(): string {
    return this.doctorName;
  }

  setEngineerName(name: string) {
    this.engineerName = name;
  }

  getEngineerName(): string {
    return this.engineerName;
  }

  setExplorer(explorer: Character) {
    this.explorer = explorer;
  }

  getExplorer(): Character | undefined {
    return this.explorer;
  }

  setDoctor(doctor: Character) {
    this.doctor = doctor;
  }

  getDoctor(): Character | undefined {
    return this.doctor;
  }

  setEngineer(engineer: Character) {
    this.engineer = engineer;
  }

  getEngineer(): Character | undefined {
    return this.engineer;
  }
}
