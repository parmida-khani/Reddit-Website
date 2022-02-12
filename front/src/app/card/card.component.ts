import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import {Router} from '@angular/router';
import {PostModel, SignUpModel} from "../models";
import { DomSanitizer } from '@angular/platform-browser';
import {SendRequestService} from "../services/send-request.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnChanges {
  @Input() post!: PostModel;
  @Input() playlistIds!: number[];
  @Output() playlistIdsChange = new EventEmitter<number[]>();
  public username: string = '';
  imagePath:any;
  hide:boolean=true;
  numOfLike:number | undefined=0;
  user!:SignUpModel;
  ngOnInit(){
    this.numOfLike=this.post.numOfLikes;
    const userStr = localStorage.getItem('user');
    if (typeof userStr === "string") {
      const user:SignUpModel = JSON.parse(userStr);
      this.username = user.username;
    }
    if(this.post.userLikes?.includes(this.username)){
      this.hide=false;
    }
  }

  async likePost(id:string){
    this.hide=!this.hide;
    const bodyObject={
      username:this.username
    }

    await SendRequestService.sendRequest(
      `http://localhost:8000/posts/likePost/${id}`,
      true,
          bodyObject,
      true

    )
    // @ts-ignore
    this.numOfLike++;
  }

  async unLikePost(id:string){
    this.hide=!this.hide;
    const bodyObject={
      username:this.username
    }

    await SendRequestService.sendRequest(
      `http://localhost:8000/posts/unlikePost/${id}`,
      true,
          bodyObject,
      true
    )
    // @ts-ignore
    this.numOfLike--;

  }
  constructor(
    private router: Router,
    private _sanitizer: DomSanitizer
  ) {}
  // @ts-ignore

  public ngOnChanges(change: SimpleChanges): void {
    // if (change.playlistIds && change.playlistIds.currentValue) {
    //   if (this.playlistIds.includes(this.song.id)) {
    //     this.heartSrc = this.FILLED_HEART;
    //   } else this.heartSrc = this.HEART;
    // }


  }

  public async changeIcon(event: any) {
    // if (event.target.getAttribute('src') === this.HEART) {
    //   this.heartSrc = this.FILLED_HEART;
    //   await this.fetchSongDataService.addToFavorites(this.song.id);
    //   this.playlistIds.push(this.song.id);
    //   this.playlistIdsChange.emit(this.playlistIds);
    // } else {
    //   this.heartSrc = this.HEART;
    //   await this.fetchSongDataService.removeSongFromPlaylist(this.song.id);
    //   const index = this.playlistIds.indexOf(this.song.id, 0);
    //   if (index > -1) {
    //     this.playlistIds.splice(index, 1);
    //   }
    //   this.playlistIdsChange.emit(this.playlistIds);
    // }
  }

  public async goToSongPage() {
    // await this.router.navigateByUrl(`/song/${this.song.id}`);
  }
}
