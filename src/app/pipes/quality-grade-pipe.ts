import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'qualityGrade'
})
export class QualityGradePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value ===1){
      return 'A'
    }
    else    if(value ===2 ){
      return 'B'
    }
      else    if(value ===3 ){
      return 'C'
    }
    return value;
  }

}
