import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'songsDuration'
})
export class SongsDurationPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const result = (value / 1000 / 60);
    return result < 10 ? '0' + result.toFixed(2) : result.toFixed(2);
  }

}
