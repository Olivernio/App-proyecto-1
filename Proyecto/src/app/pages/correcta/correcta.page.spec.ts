import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CorrectaPage } from './correcta.page';

describe('CorrectaPage', () => {
  let component: CorrectaPage;
  let fixture: ComponentFixture<CorrectaPage>;
  // @ts-ignore

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CorrectaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
