/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: Unit-Tests AboutComponent
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 2.0.0
 * @since 26.04.2017, 2017.
 */
import {Pipe, PipeTransform} from '@angular/core';
import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {TranslateService} from '@ngx-translate/core';
import {ButtonModule, GrowlModule, Message} from 'primeng/primeng';
import {Observable, of} from 'rxjs';

import {AboutComponent} from './about.component';
import {PostsService} from './posts.service';
import {Post} from './posts.model';

@Pipe({name: 'translate'})
class MockPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return undefined;
    }
}

describe('AboutComponent', () => {
    let component: AboutComponent;
    let fixture: ComponentFixture<AboutComponent>;

    class TranslateServiceMock {
        public use() {
        }
    }

    class MockPostsService {
        public getAllPosts(): Observable<Array<Post>> {
            return of([{
                userId: 1,
                id: 1,
                title: 'Hello, I am Batman',
                body: 'I am a hero that is drives in super fast cars'
            }, {
                userId: 2,
                id: 2,
                title: 'Hello, I am Spiderman',
                body: 'Hello, I am the friendly neighborhood spider'
            }]);
        }

        public getPostById(id): Observable<Post> {
            return of({
                userId: 1,
                id: 1,
                title: 'Hello, I am Batman',
                body: 'I am a hero that is drives in super fast cars'
            });
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [GrowlModule, ButtonModule],
            declarations: [AboutComponent, MockPipe],
            providers: [
                {provide: TranslateService, useClass: TranslateServiceMock}
            ]
        })
            .overrideComponent(AboutComponent, {
                set: {
                    providers: [
                        {provide: PostsService, useClass: MockPostsService}
                    ]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed
            .createComponent(AboutComponent);

        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('has a name property [aboutMessage]', () => {
        expect(component.aboutMessage).toBe('Über dieses Template');
    });

    it('onInit should subscribe to PostsService [getAllPosts]', () => {
        component.ngOnInit();
        component.posts$.subscribe((posts: Array<Post>) => {
            expect(posts[0].title).toBe('Hello, I am Batman');
            expect(posts[1].title).toBe('Hello, I am Spiderman');
        });
    });

    it('should push three messages to the message opject', () => {
        // given
        const createMessage = (severity, summary, detail) => ({severity, summary, detail});
        const expectedSuccessMessage: Message = createMessage('info', 'Info Message', 'PrimeNG rocks');
        const expectedWaringMessage: Message = createMessage('warn', 'Warn Message', 'Sample warning');
        const expectedErrorMessage: Message = createMessage('error', 'Error Message', 'Sample error');

        // when
        component.createMessages();
        // then
        expect(component.messages).toContain(expectedSuccessMessage);
        expect(component.messages).toContain(expectedWaringMessage);
        expect(component.messages).toContain(expectedErrorMessage);
    });

    it('onInit should subscribe to PostsService [getPostById]', () => {
        component.ngOnInit();
        component.postById$.subscribe((post: Post) => {
            expect(post.title).toBe('Hello, I am Batman');
        });
    });

    it('should call the translationService to change the language',
        inject([TranslateService], (translateService: TranslateService) => {
            const lang = 'de';
            spyOn(translateService, 'use');
            component.changeLanguage(lang);
            expect(translateService.use).toHaveBeenCalled();
        })
    );
});
