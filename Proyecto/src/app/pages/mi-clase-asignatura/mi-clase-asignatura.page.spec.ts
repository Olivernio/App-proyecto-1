import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiClaseAsignaturaPage } from './mi-clase-asignatura.page';

describe('MiClaseAsignaturaPage', () => {
  let component: MiClaseAsignaturaPage;
  let fixture: ComponentFixture<MiClaseAsignaturaPage>;
  // @ts-ignore
  beforeEach(async(() => {
    fixture = TestBed.createComponent(MiClaseAsignaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
