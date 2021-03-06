/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SaoiTestModule } from '../../../test.module';
import { EvaluateTemplateComponent } from '../../../../../../main/webapp/app/entities/evaluate-template/evaluate-template.component';
import { EvaluateTemplateService } from '../../../../../../main/webapp/app/entities/evaluate-template/evaluate-template.service';
import { EvaluateTemplate } from '../../../../../../main/webapp/app/entities/evaluate-template/evaluate-template.model';

describe('Component Tests', () => {

    describe('EvaluateTemplate Management Component', () => {
        let comp: EvaluateTemplateComponent;
        let fixture: ComponentFixture<EvaluateTemplateComponent>;
        let service: EvaluateTemplateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SaoiTestModule],
                declarations: [EvaluateTemplateComponent],
                providers: [
                    EvaluateTemplateService
                ]
            })
            .overrideTemplate(EvaluateTemplateComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EvaluateTemplateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EvaluateTemplateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EvaluateTemplate(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.evaluateTemplates[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
