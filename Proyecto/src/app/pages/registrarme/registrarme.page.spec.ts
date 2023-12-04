import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarmePage } from './registrarme.page';

//@ts-ignore
describe('RegistrarmePage', () => {
  let component: RegistrarmePage;
  let fixture: ComponentFixture<RegistrarmePage>;

  //@ts-ignore
  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistrarmePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  //@ts-ignore
  it('should create', () => {
    //@ts-ignore
    expect(component).toBeTruthy();
  });
});
