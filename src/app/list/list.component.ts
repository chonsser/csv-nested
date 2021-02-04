import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  elements: [] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.downloadData();
  }

  downloadData(): void {
    this.http.get<string>('/assets/data.csv', {responseType: 'text' as 'json'}).subscribe((data) => {
      this.elements = this.parseData(data);
    });
  }

  parseData(data): [] {
    data = data.split('\n');

    data = data.slice(1).map(e => e.split(';').map(b => b.split('.')));

    data = [].concat(...data).filter(e => e[0].trim().length > 0);

    data = data.map((row, key, rootArr) => {
      if (row.length > 1) {
        return null;
      }

      const getChildrenOfLetter = (arr, char) => arr.filter(e => e[0] === char && e.length > 1).map(e => e.slice(1));
      const extractChildrenObjects = (arr) => arr.map((e) => {
        if (e.length === 1) {
          const letter = e[0];
          return {
            title: letter,
            children: extractChildrenObjects(getChildrenOfLetter(arr, letter))
          };
        }
        return null;
      }).filter(e => e !== null);

      row = row.map((letter) => {
        const letterRelatedChildren = getChildrenOfLetter(rootArr, letter);

        return {
          title: letter,
          children: extractChildrenObjects(letterRelatedChildren)
        };
      });

      return row[0];
    }).filter(e => e !== null);

    return data;
  }
}
