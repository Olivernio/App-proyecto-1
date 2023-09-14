import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncorrectaPage } from './incorrecta.page';

describe('IncorrectaPage', () => {
  let component: IncorrectaPage;
  let fixture: ComponentFixture<IncorrectaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IncorrectaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
