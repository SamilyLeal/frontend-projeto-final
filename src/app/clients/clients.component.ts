import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/models/Client';
import { ClientService } from '../client.service';
import { FilterPipe } from '../pipe/filter.pipe';
import { zipCodeValidator, phoneValidator } from '../validation/validators';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  providers: [ FilterPipe ],
})
export class ClientsComponent implements OnInit {
  
  clients: Client[] = [];
  formGroupClient: FormGroup;
  submited: boolean = false;
  searchTextName: string = '';
  searchTextEmail: string = '';
  searchFilter: string = '';
  
  constructor(private clientService: ClientService, private fb: FormBuilder, private filterPipe: FilterPipe){
    this.formGroupClient = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, phoneValidator()]],
      address: ['', [Validators.required]],
      zipCode: ['', [Validators.required, zipCodeValidator()]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.clientService.getClients().subscribe({
      next: clients => this.clients = clients
    })
  }

  search() {
    const searchText = this.searchFilter === 'name' ? this.searchTextName : this.searchTextEmail;
    this.clients = this.filterPipe.transform(this.clients, searchText, this.searchFilter);
  }

  clearSearch() {
    this.searchTextName = '';
    this.searchTextEmail = '';
    this.ngOnInit();
  }

  save(){
    this.submited = true;

    if(this.formGroupClient.valid){
        this.clientService.save(this.formGroupClient.value).subscribe({
          next: client => {
            this.clients.push(client);
            this.formGroupClient.reset();
            this.submited = false;
          }
        })
    }
  }

  delete(client: Client){
    this.clientService.delete(client).subscribe({
      next: () => {
        this.clients = this.clients.filter(f => f.id !== client.id);
      }
    })
  }

  get name(): any{
    return this.formGroupClient.get("name");
  }

  get email(): any{
    return this.formGroupClient.get("email");
  }

  get phone(): any{
    return this.formGroupClient.get("phone");
  }

  get address(): any{
    return this.formGroupClient.get("address");
  }

  get zipCode(): any{
    return this.formGroupClient.get("zipCode");
  }

  get city(): any{
    return this.formGroupClient.get("city");
  }

  get state(): any{
    return this.formGroupClient.get("state");
  }

}
