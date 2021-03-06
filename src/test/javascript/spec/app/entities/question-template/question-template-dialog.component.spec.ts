/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SaoiTestModule } from '../../../test.module';
import { QuestionTemplateDialogComponent } from '../../../../../../main/webapp/app/entities/question-template/question-template-dialog.component';
import { QuestionTemplateService } from '../../../../../../main/webapp/app/entities/question-template/question-template.service';
import { QuestionTemplate } from '../../../../../../main/webapp/app/entities/question-template/question-template.model';

describe('Component Tests', () => {

    describe('QuestionTemplate Management Dialog Component', () => {
        let comp: QuestionTemplateDialogComponent;
        let fixture: ComponentFixture<QuestionTemplateDialogComponent>;
        let service: QuestionTemplateService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SaoiTestModule],
                declarations: [QuestionTemplateDialogComponent],
                providers: [
                    QuestionTemplateService
                ]
            })
            .overrideTemplate(QuestionTemplateDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuestionTemplateDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuestionTemplateService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new QuestionTemplate(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.questionTemplate = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'questionTemplateListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new QuestionTemplate();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.questionTemplate = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'questionTemplateListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
