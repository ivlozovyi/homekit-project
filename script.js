const dom = {
    selectbox: document.querySelector(".selectbox"),
    selectboxList: document.querySelector('.selectbox__list'),
    selectboxSelected: document.querySelector('.selectbox__selected'),
    selectboxItem: document.querySelector('.selectbox__item'),
    rooms: document.querySelector("#rooms"),
}

const listOFRooms = {
    all: 'All Rooms',
    livingroom: 'Living Room',
    bedroom: 'Bedroom',
    kitchen: 'Kitchen',
    bathroom: 'Bathroom',
    studio: 'Studio',
    washingroom: 'Washing Room',
}


const {selectbox, selectboxList, selectboxSelected, rooms, selectboxItem} = dom;

selectboxSelected.addEventListener('click', (e)=> {
    selectbox.classList.toggle("open");
})
document.body.addEventListener('click', (e) => {
    const {target} = e;
    if(!target.matches(".selectbox") && !target.parentElement.parentElement.matches(".selectbox") && !target.parentElement.matches('.selectbox') ){
        selectbox.classList.remove("open")
    }
});

selectboxList.addEventListener('click', (e) =>{
    const {target} = e;
    if(target.matches(".selectbox__item")){
        const {room} = target.dataset;
        selectboxList.querySelector('.selected').classList.remove('selected');
        target.classList.add('selected');
        selectbox.classList.remove("open");
        selectRoom(room);
    }
});

function selectRoom(room) {
    const selectedRoom = rooms.querySelector('.selected');
    if(selectedRoom) {
        selectedRoom.classList.remove('selected');
    };
    if(room !== 'all'){
        const newSelectedRoom = rooms.querySelector(`[data-room=${room}`);
        newSelectedRoom.classList.add('selected');
        renderScreen(false);
    } else {
        renderScreen(true);
    }
    const selectedSelectboxRoom = selectbox.querySelector('.selectbox__item.selected');
    selectedSelectboxRoom.classList.remove('selected');
    const newSelectedItem = selectbox.querySelector(`[data-room="${room}"]`);
    newSelectedItem.classList.add('selected');
    const selectboxSpan = selectbox.querySelector('.selectbox__selected span');
    selectboxSpan.innerText = listOFRooms[room];
}

rooms.querySelectorAll('.mobile__room').forEach(element => {
    element.addEventListener('click', ()=> {
        const {room} = element.dataset;
        selectRoom(room);
    }) 
})

function renderScreen(isRooms) {
    setTimeout( () => {
        if(isRooms) {
            rooms.style.display = "grid";
        } else {
            rooms.style.display = "none"
        }
    }, 300)
}