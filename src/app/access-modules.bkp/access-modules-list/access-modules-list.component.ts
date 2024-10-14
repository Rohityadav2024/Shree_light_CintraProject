import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BridgeService } from 'src/app/modules/service/bridge.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NotiferService } from 'src/app/modules/service/helpers/notifer.service';


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
  constructor(private bridgeService: BridgeService, private _ActivatedRoute: ActivatedRoute,private _location: Location, private route: Router, private _NotifierService: NotiferService) { }


  isShow = false;
  openId = -1;

  showhid (index: number): void {
    if (this.openId === index) {
      // If the current module is already open, close it
      this.isShow = false;
      this.openId = -1;
    } else {
      // Otherwise, open the clicked module
      this.isShow = true;
      this.openId = index;
    }
  }
  ngOnInit(): void {
   
    
    console.log(this._ActivatedRoute);
    this._ActivatedRoute.params.subscribe(params => {
      const id = params['id'];
      console.log('ID from query params:', id);

      this.getRoles(id);
    });
    this.GetAllModule();
    // this.bridgeService.getAccessManagementRole(this._ActivatedRoute.snapshot.params.id).subscribe((accessRes: any) => {
    //   // console.log(accessRes.data);
    //   this.payloadModule = accessRes.data;
    //   
    // },
    //   (accessError: any) => {
    //     console.error('Error fetching access modules', accessError);
    //     // Handle error if necessary
    //   }
    // );
    // this.bridgeService.ModuleList().subscribe(() => {
      
    // });
  }

  openId1: any = -1;
isShow1: boolean = false;

showhid1(id: any) {
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
          this.bridgeService.getAccessManagementRole(this._ActivatedRoute.snapshot.params.id).subscribe(
            (accessRes: any) => {
              this.Module = accessRes.data.map((module: { is_add: boolean; is_view: boolean; is_edit: boolean; data: any[] }) => {
                
                // Check if all items in the 'view' and 'edit' columns are true
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
      (error: any) => {
        console.error('Error checking API data', error);
      }
  }

  toggleAll(module: any, checked: boolean, type: string) {
    const updatedData = module.data.map((item: any) => ({
      ...item,
      [type]: checked
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
 
 
updateChildItem(module: any, checked: boolean, type: string, childItem: any, parentIndex: number, childIndex: number) {
  // Ensure that module.data has a specific type for the items
  const updatedData = module.data.map((item: { view?: boolean, edit?: boolean }, itemIndex: number) => ({
    ...item,
    edit: type === 'edit' && childIndex === itemIndex ? checked : item.edit || false,
    view: type === 'view' && childIndex === itemIndex ? checked : item.view || false
  }));
 
  // Explicitly type 'item' inside the every function
  const allViewChecked = updatedData.every((item: { view?: boolean }) => item.view === true);
  const allEditChecked = updatedData.every((item: { edit?: boolean }) => item.edit === true);
 
  const moduleIndex = this.Module.findIndex(m => m.module_id === module.module_id);
  if (moduleIndex >= 0) {
    this.Module[moduleIndex] = {
      ...this.Module[moduleIndex],
      data: updatedData,
      selectAllView: allViewChecked,
      selectAllEdit: allEditChecked
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

    // Send POST request to create new modules
    this.bridgeService.ViewAddEdit(payload).subscribe(
      (res: any) => {
        this.isLoading = false;

        if (res.status === 200) {
          if (id === "1") {
            this.route.navigate(['/login']);
          } else {
            this.route.navigate(['/access-modules']);
            this._NotifierService.showSuccess("Modules Saved");
          }
        } else {
          alert(res.message);
        }
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error saving settings', error);
      }
    );
  });
}

}  
