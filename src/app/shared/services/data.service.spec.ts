import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import Chance from 'chance';

import { DataService } from './data.service';
import { Album, Photo, Post, User } from '../models';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

const chance = new Chance();

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), provideHttpClient(), DataService],
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts', () => {
    const dummyPosts: Post[] = [
      {
        userId: chance.integer({ min: 1, max: 10 }),
        id: chance.integer({ min: 1, max: 100 }),
        title: chance.sentence({ words: 5 }),
        body: chance.paragraph(),
      },
    ];

    const httpClient = TestBed.inject(HttpClient);
    spyOn(httpClient, 'get').and.returnValue(of(dummyPosts));

    service.getPosts().subscribe((posts) => {
      expect(posts.length).toBe(1);
      expect(posts).toEqual(dummyPosts);
    });

    expect(service).toBeTruthy();
  });

  it('should fetch photos', () => {
    const dummyPhotos: Photo[] = [
      {
        albumId: chance.integer({ min: 1, max: 10 }),
        id: chance.integer({ min: 1, max: 100 }),
        title: chance.sentence({ words: 5 }),
        url: chance.url(),
        thumbnailUrl: chance.url(),
      },
    ];

    const httpClient = TestBed.inject(HttpClient);
    spyOn(httpClient, 'get').and.returnValue(of(dummyPhotos));

    service.getPhotos().subscribe((photos) => {
      expect(photos.length).toBe(1);
      expect(photos).toEqual(dummyPhotos);
    });

    expect(service).toBeTruthy();
  });

  it('should fetch albums', () => {
    const dummyAlbums: Album[] = [
      {
        userId: chance.integer({ min: 1, max: 10 }),
        id: chance.integer({ min: 1, max: 100 }),
        title: chance.sentence({ words: 5 }),
      },
    ];

    const httpClient = TestBed.inject(HttpClient);
    spyOn(httpClient, 'get').and.returnValue(of(dummyAlbums));

    service.getAlbums().subscribe((albums) => {
      expect(albums.length).toBe(1);
      expect(albums).toEqual(dummyAlbums);
    });

    expect(service).toBeTruthy();
  });

  it('should fetch a user by id', () => {
    const dummyUser: User = {
      id: chance.integer({ min: 1, max: 100 }),
      name: chance.name(),
      username: chance.word(),
      email: chance.email(),
      address: {
        street: chance.street(),
        suite: chance.sentence({ words: 2 }),
        city: chance.city(),
        zipcode: chance.zip(),
        geo: {
          lat: chance.string(),
          lng: chance.string(),
        },
      },
      phone: chance.phone(),
      website: chance.url(),
      company: {
        name: chance.company(),
        catchPhrase: chance.sentence({ words: 6 }),
        bs: chance.sentence({ words: 3 }),
      },
    };

    const httpClient = TestBed.inject(HttpClient);
    spyOn(httpClient, 'get').and.returnValue(of(dummyUser));

    const userId = dummyUser.id;
    service.getUser(userId).subscribe((user) => {
      expect(user).toEqual(dummyUser);
    });

    expect(service).toBeTruthy();
  });
});
