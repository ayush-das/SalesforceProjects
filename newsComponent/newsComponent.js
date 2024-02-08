import { LightningElement, track } from 'lwc';
import retriveNews from "@salesforce/apex/newsController.retriveNews";

export default class NewsComponent extends LightningElement {
    @track result = [];
    @track selectedNews = {};
    @track isModalOpen = false;
    get modalClass() {
        return `slds-modal ${this.isModalOpen ? "slds-fade-in-open" :""}`
    }

    get modalBackdropClass() {
            return this.isModalOpen ? "slds-backdrop slds-backdrop_open" : "slds-backdrop"
        }
        //Call Lifecycle

    connectedCallback() {
            this.fetchNews();
        }
        //Implement this method
    fetchNews() {
        //This fetches data and consoles our content
        retriveNews().then(response => {
            console.log(response);
            this.formatNewsData(response.articles);
        }).catch(error => {
            console.log(error);
        });
    }

    //format this data for looping and set unique id 

    formatNewsData(res) {
        // this converts data into array and generate ids
        this.result = res.map((item, index) => {
            let id = `new_${index+1}`;
            let date = new Date(item.publishedAt).toDateString();
            let name = item.source.name;

            return {...item, id: id, name: name, date: date } //mapping
        })
    }

    showModal(event) {
        let id = event.target.dataset.item;
        this.result.forEach(item => {
            if (item.id === id) {
                this.selectedNews = {...item }
            }
        })
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }
}
// {
//     -"articles": [
//     -{
//     -"source": {
//     "id": "techcrunch",
//     "name": "TechCrunch"
//     },
//     "author": "Kyle Wiggers",
//     "title": "ElevenLabs' voice-generating tools launch out of beta | TechCrunch",
//     "description": "ElevenLabs, a startup building voice-generating tools, has launched out of beta with support for other 30 languages.",
//     "url": "https://techcrunch.com/2023/08/22/elevenlabs-voice-generating-tools-launch-out-of-beta/",
//     "urlToImage": "https://techcrunch.com/wp-content/uploads/2021/01/ebmpqh7x7jgqejg6uglz.jpg?resize=1196,1200",
//     "publishedAt": "2023-08-22T22:59:41Z",
//     "content": "ElevenLabs, the viral AI-powered platform for creating synthetic voices, today launched its platform out of beta with support for more than 30 languages.\r\nUsing a new AI model developed in-house, Ele… [+3723 chars]"
//     }