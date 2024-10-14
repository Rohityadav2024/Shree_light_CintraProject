import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BridgeService } from 'src/app/modules/service/bridge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { Location } from '@angular/common';


@Component({
  selector: 'app-access-modules-list',
  templateUrl: './access-modules-list.component.html',
  styleUrls: ['./access-modules-list.component.scss']
})
export class AccessModulesListComponent implements OnInit {
  isLoading: boolean = false;
  Module: any[] = [];
  UserRole: any = [];
  role_id: number | null = null;
  payloadModule: any[] = [];
  role_name: any[] = [];
  localStorageData: any[] = [];
  dropdownStates: boolean[] = [];
  constructor(private bridgeService: BridgeService, private _ActivatedRoute: ActivatedRoute,private _location: Location,private route: Router) { }

  ngOnInit(): void {
   
    
    console.log(this._ActivatedRoute);
    this._ActivatedRoute.params.subscribe(params => {
      const id = params['id'];
      console.log('ID from query params:', id);

      this.getRoles(id);
    });

    this.bridgeService.getAccessManagementRole(this._ActivatedRoute.snapshot.params.id).subscribe((accessRes: any) => {
      // console.log(accessRes.data);
      this.payloadModule = accessRes.data;
      this.GetAllModule();
    },
      (accessError: any) => {
        console.error('Error fetching access modules', accessError);
        // Handle error if necessary
      }
    );
    this.bridgeService.ModuleList().subscribe(() => {
      
    });
  }

  openId: any = -1;
isShow: boolean = false;

showhid(id: any) {
  if (this.openId === id) {
    this.isShow = !this.isShow;
  } else {
    this.isShow = true;
    this.openId = id;
  }
}

  backClicked() {
    this._location.back();
  }

  getRoles(routeId: any) {
    this.bridgeService.GetRoles().subscribe(
      (data: any) => {
        this.UserRole = data.data;
        // console.log('Roles:', this.UserRole);
        // console.log('Route ID:', routeId);
  
        // Find the matching role (using == for type coercion)
        const matchedRole = this.UserRole.find((role: any) => role.id == routeId);
        if (matchedRole) {
          // console.log('Matched Role:', matchedRole);
          this.role_name = matchedRole.Name;
        } else {
          console.log('No matching role found.');
        }
      },
      (error: any) => {
        console.error('Error fetching roles', error);
      }
    );
  }

  GetAllModule(): void {
    this.bridgeService.getAccessManagementRole(this._ActivatedRoute.snapshot.params.id).subscribe((accessRes: any) => {
        let localStorageData: any[] = [];
        if (accessRes && accessRes.data && accessRes.data.length === 0) {
          this.bridgeService.ModuleList().subscribe((data: any) => {
            debugger
          data.data.map((module: any) => {
                let moduleIndex = this.payloadModule.findIndex(m => m.module_id === module?.id);
                let moduleData = this.payloadModule[moduleIndex];
                localStorageData.push({
                  ...(moduleIndex=!-1?moduleData:module),
                  id: moduleData?.id , 
                  client_id: "111", 
                  module_id: module?.module_id || module?.id, 
                  is_view: moduleData?.is_view ?? true,
                  is_add: moduleData?.is_add ?? true,  
                  is_edit: moduleData?.is_edit ?? true, 
                  data: module.data ? JSON.parse(module.data) : [],
                  module_name: module.module_name 
                })
              });
  
              console.log('Stored local data:', localStorageData);
  
              this.Module = localStorageData;
              console.log('Module data from backend', this.Module);
            },
            (error: any) => {
              console.error('Error fetching components from backend', error);
            }
          );
        } else {
          // API returned existing data, use sessionStorage data
          this.bridgeService.getAccessManagementRole(this._ActivatedRoute.snapshot.params.id).subscribe(
            (accessRes: any) => {
              this.Module = accessRes.data.map((module: { is_add: boolean; is_view: boolean; is_edit: boolean; data: any[] }) => {
                // Process data and determine if header checkboxes should be true
                const allViewTrue = module.data.every((item: { view: boolean }) => item.view === true);
                const allEditTrue = module.data.every((item: { edit: boolean }) => item.edit === true);
                
                return {
                  ...module,
                  is_add: module.is_add === true,
                  is_view: module.is_view === true,
                  is_edit: module.is_edit === true,
                  data: module.data.map((item: { edit: boolean; view: boolean }) => ({
                    ...item,
                    edit: item.edit === true,
                    view: item.view === true
                  })),
                  selectAllView: allViewTrue,  
                  selectAllEdit: allEditTrue   
                };
              });
          
              console.log('Module data from getAccessManagementRole API', this.Module);
            },
            (error: any) => {
              console.error('Error fetching access management role data', error);
            }
          );          
        }
      },
      (error: any) => {
        console.error('Error checking API data', error);
      }
    );
  }

  toggleAll(module: any, checked: boolean, type: string) {
    const updatedData = module.data.map((item: any) => ({
      ...item,
      [type]: checked
    }));
  debugger
    const moduleIndex = this.Module.findIndex(m => m.module_id === module.module_id);
    if (moduleIndex >= 0) {
      this.Module[moduleIndex] = {
        ...this.Module[moduleIndex],
        data: updatedData,
        selectAllView: type === 'view' ? checked : module.selectAllView,
        selectAllEdit: type === 'edit' ? checked : module.selectAllEdit
      };
    }
    console.log(this.Module);
  }

updateChildItem(module: any, checked: boolean, type: string, childItem: any,parentIndex:number,childIndex:number) {

  const updatedData = module.data.map((item: any,itemIndex:number) => ({
      ...item,
      edit: type === 'edit' && childIndex===itemIndex ? checked : item.edit,
      view: type === 'view'&& childIndex===itemIndex ? checked : item.view
  }));

  const moduleIndex = this.Module.findIndex(m => m.module_id === module.module_id);
  if (moduleIndex >= 0) {
      this.Module[moduleIndex] = {
          ...this.Module[moduleIndex],
          data: updatedData,
          selectAllView: type === 'view' ? checked : module.selectAllView,
          selectAllEdit: type === 'edit' ? checked : module.selectAllEdit
      };
  }
  console.log(this.Module);
}


// Function to update parent module properties
moduleUpdator(module: any, checked: boolean, type: string) {
  const moduleIndex = this.Module.findIndex(m => m.module_id === module.module_id);
  const updatedModule = {
      module_id: module.module_id,
      is_view: type === 'view' ? checked : module.is_view,
      is_edit: type === 'edit' ? checked : module.is_edit,
      is_add: type === 'add' ? checked : module.is_add,
      data: module.data
  };

  if (moduleIndex >= 0) {
      this.Module[moduleIndex] = {
          ...this.Module[moduleIndex],
          is_view: updatedModule.is_view,
          is_edit: updatedModule.is_edit,
          is_add: updatedModule.is_add,
      };
  } else {
      this.Module.push(updatedModule);
  }
  console.log(this.Module);
}



  saveSettings(f: NgForm) {
    // Subscribe to the route parameters to get the 'id'
    this._ActivatedRoute.params.subscribe(params => {
      const id = params['id'];  // Extract the 'id' from the route parameters

      if (!id) {
        alert('Role ID is not available');
        return;
      }

      this.isLoading = true;

      const payload = {
        role_id: id,  // Use the 'id' from the query parameters
        modules_name: this.Module
      };

      // sessionStorage.setItem('savedSettings', JSON.stringify(payload));

      // Send POST request to create new modules
      this.bridgeService.ViewAddEdit(payload).subscribe(
        (res: any) => {
          // After POST is successful, send PATCH request to update modules
          this.bridgeService.UpdateAccessModule(payload).subscribe(
            (updateRes: any) => {
              this.isLoading = false;
              // console.log(payload)
              if (updateRes.status === '200') {
                if (id === '1') {
                  this.route.navigate(['/login']);
                } else {
                  this.route.navigate(['/access-modules']);
                }
              } else {
                alert(updateRes.message);
              }
            },
            (updateError: any) => {
              this.isLoading = false;
              console.error('Error updating settings', updateError);
            }
          );
        },
        (error: any) => {
          this.isLoading = false;
          console.error('Error saving settings', error);
        }
      );
    });
  }
}  
