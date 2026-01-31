import { Component, HostListener } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { Router, RouterLink } from '@angular/router';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-add-cruise',
   imports: [CommonModule,RouterLink,MatSelectModule,NgxEditorModule,DatePickerModule,
    FormsModule,BsDatepickerModule
  ],
  
  templateUrl: './add-cruise.component.html',
  styleUrl: './add-cruise.component.scss'
})
export class AddCruiseComponent {
  public routes=routes;
  bsValue=new Date();
  time: Date | null = null;
  isDelete : boolean[]=[false];
  constructor(private router:Router){}
  editor!: Editor;
  editor1!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic', 'format_clear'],
    ['underline', 'strike'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['image'],
  ];
  tabs = [
    { id: 'basic_info', label: 'Basic Info' },
    { id: 'specifications', label: 'specifications' },
    { id: 'additional_service', label: 'Additional Service' },
    { id: 'description', label: 'Description' },
    { id: 'amenties', label: 'Amenities' },
    { id: 'itenary', label: 'Itenary' },
    { id: 'location', label: 'Locations' },
    { id: 'faq', label: 'FAQ' },
    { id: 'gallery', label: 'Gallery' },
  ];
  tabs1 = [
    { id: 'basic_info_2', label: 'Basic Info' },
    { id: 'description_2', label: 'Description' },
    { id: 'specification', label: 'Specifications' },
    { id: 'popular_amenities_2', label: 'Amenities' },
    { id: 'gallery_2', label: 'Gallery' },
  ];
  activeTab: string = this.tabs[0]?.id || this.tabs1[0]?.id; // Default to the first tab

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

      // Combine tabs and tabs1 for iteration
  const allTabs = [...this.tabs, ...this.tabs1];

  allTabs.forEach((tab) => {
      const element = document.getElementById(tab.id);
      if (element) {
        const sectionTop = element.offsetTop - 100; // Adjust offset for fixed headers
        const sectionBottom = sectionTop + element.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          this.activeTab = tab.id;
        }
      }
    });
  }


  scrollTo(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeTab = id; // Update the active tab
    }
  }
  formData: any[] = []; // Initialize with an empty object to start with one row

  addNewRow() {
    this.formData.push({});
  }

  removeRow(index: number) {
      this.formData.splice(index, 1);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  trackByIndex(index: number, item: any) {
    return index;
  }
  onDelete(index:number):void{
    this.isDelete[index]=!this.isDelete[index];
  }
  onSubmit() :void { 
    this.router.navigateByUrl('/cruise/cruise-grid'); 
  }
  ngOnInit(): void {
    this.editor = new Editor();
    this.editor1 = new Editor();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
    this.editor1.destroy();
  }
}
