import { Pipe, PipeTransform } from '@angular/core';
import { Client } from '../models/Client';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(clients: Client[], searchText: string, searchFilter: string): Client[] {
    if (searchText.trim() === '') {
      return clients;
    }

    searchText = searchText.toLowerCase();

    return clients.filter((client) => {
      const fieldValue = searchFilter === 'name' ? client.name : client.email;
      return fieldValue.toLowerCase().includes(searchText);
    });
  }

}
