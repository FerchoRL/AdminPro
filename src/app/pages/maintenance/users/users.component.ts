import { Component, OnDestroy, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { delay, Subscription } from "rxjs";
import { User } from "src/app/models/user.model";
import { ModalImageService } from "src/app/services/modal-image.service";
import { SearchsService } from "src/app/services/searchs.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: [
        './users.component.css'
    ]
})

export class UsersComponent implements OnInit, OnDestroy {

    public totalUsers: number = 0;
    public users: User[] = [];
    public usersTemp: User[] = [];
    public fromPage: number = 0;
    public loadingElement: boolean = true;
    public imgSubs: Subscription = new Subscription;

    constructor(private userService: UserService,
        private searchsService: SearchsService,
        private modalImageService: ModalImageService) { }

    ngOnDestroy(): void {
        this.imgSubs.unsubscribe();
    }

    ngOnInit(): void {
        this.refreshUsers();
        this.imgSubs = this.modalImageService.newImg
        .pipe(
            delay(100)//Darle tiempo al servidor de recargar para mostrar la imagen
        ).subscribe(img => this.refreshUsers())//Debo cerrar esta subscripcion
    }

    //Funcion que me ayuda a actualizar la pagina cuando cambie de paginacion
    refreshUsers() {
        this.loadingElement = true;
        //Envio 5 como limite para mostrar de 5 en 5
        this.userService.loadUsers(this.fromPage, 5)
            .subscribe(({ countUsers, allUsers }) => {
                this.totalUsers = countUsers;
                this.users = allUsers;
                this.usersTemp = allUsers;//Uso estos usuarios cuando no realizo la busqueda
                this.loadingElement = false;
            });
    }

    //Implement pagination function
    changePage(value: number) {
        this.fromPage += value;
        this.fromPage = this.fromPage < 0 ? 0 : this.fromPage >= this.totalUsers ? this.fromPage -= value : this.fromPage;
        this.refreshUsers();
    }

    search(searchWord: string) {
        if (searchWord.length === 0) {
            this.users = this.usersTemp;//Si no hago ni una busqueda mantengo la lista original y no hago la peticion a mi API
            return;
        }
        this.searchsService.searchInCollection('users', searchWord)
            .subscribe(resp => {
                console.log(resp);
                this.users = resp as User[];//Necesito castear si no me marca error
            });
    }

    deleteUser(user: User) {
        //Validation to avoid deleted me by myself
        if (user.uid === this.userService.uid){
            Swal.fire('No puedes eliminar tu usuario');
            return;
        }
        Swal.fire({
            title: 'Borrar Usuario?',
            text: `Estas a punto de eliminar el usuario ${user.userName}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.userService.removeUser(user)
                    .subscribe(resp => {
                        Swal.fire(
                            'Borrado!',
                            `El usuario ${user.userName} fue eliminado`,
                            'success'
                        );
                        this.refreshUsers();
                    });
            }
        });
    }

    updateRole(user: User){//Es una opcion de actualizar la info desde las tablas
        this.userService.saveUser(user)
        .subscribe();
    }

    //Function to open the modal. This happened due modal is in all the project
    openModal(user: User){
        this.modalImageService.oppenModal('users', user.uid || '', user.img || 'notImage');
    }
}