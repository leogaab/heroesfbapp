import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  loading: boolean;

  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {

    this.loading = true;

    this.heroesService.getHeroes()
      .subscribe( res => {
        console.log(res);
        this.heroes = res;

        this.loading = false;
      });
  }

  deleteHeroe(heroe: HeroeModel, idx: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro que desea borrar a ${ heroe.nombre }?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    })
    .then( resp => {
      if (resp.value) {
        this.heroes.splice(idx, 1);
        this.heroesService.deleteHeroe(heroe.id).subscribe();
      }
    });

  }

}
