/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RateTableComponent } from './rate-table.component';

describe('RateTableComponent', () => {
  let component: RateTableComponent;
  let fixture: ComponentFixture<RateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
