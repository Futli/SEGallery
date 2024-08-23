import { action, makeAutoObservable, runInAction } from 'mobx';
import { ImageCard } from '../types';
import apiService from '../api/apiService';

type InfoProps = {
    pages: number,
    count: number
}


class Gallery {
    isLoaded: boolean = false;
    isLoading: boolean = false;
    isLoadingMore: boolean = false;
    isListEnd: boolean = false;
    count: number = 0;
    pages: number = 0;
    page: number = 1;
    items: Array<ImageCard> = [];
    error: string | null = null;
    activeImage: ImageCard | null = null;
    imagesPerRow: number = 2;

    constructor(){
        makeAutoObservable(this,{
            setList: action,
            handleError: action,
        });
    }

    setImagesPerRow = (value: number) => {
        this.imagesPerRow = value;
    };

    clearActiveImage = () => {
        this.activeImage = null;
    };

    setActiveImage = (item: ImageCard) => {
        this.activeImage = item;
    };

    handleError = (e: Error) => {
            this.isLoaded = false;
            this.isLoading = false;
            this.error = e.message;
        };

    clearError = () =>{
        this.error = null;
    };

    setList = (data: Array<ImageCard>)=>{
        const prevItems = this.items.slice();
        this.items = [...prevItems, ...data];
    };

    setInfo = (info: InfoProps)=>{
        this.isLoaded = true;
        this.isLoading = false;
        this.pages = info.pages;
        this.count = info.count;
    };

    fetchData = () => {
        apiService.get('character/?page=' + this.page).then(res => {
            if(res.status === 200 && res.data){
                return res.data;
        }}).then( data => runInAction(()=>{
            this.setList(data.results);
            this.setInfo(data.info);
            this.isLoadingMore = false;
        }
        )
        ).catch(err => runInAction(() => this.handleError(err)));
    };

    loadInit = () => {
        this.clearError();
        this.items = [];
        this.isLoading = true;
        this.page = 1;
        this.fetchData();
    };

    loadMore = ()=>{
        this.isLoading = true;
        this.page = this.page + 1;
        this.isLoadingMore = true;
        if(this.page >= this.pages){
            this.isListEnd = true;
            return;
        }
        this.fetchData();
    };
}

export default new Gallery();
