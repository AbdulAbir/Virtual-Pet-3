//Create variables here
var dog;
var foodS;
var dogImg;
var dogImg1;
var foodStock;
var fedTime;
var lastFed;
var foodObj;
var feed;
var addFood;
var bedroom,garden,washroom ;
var GameState = 0 ;

function preload()
{
bedroom = loadImage("virtual pet images/Bed Room.png");
garden = loadImage("virtual pet images/Garden.png");
washroom = loadImage("virtual pet images/Wash Room.png");
// sadDog = loadImage("virtual pet images/Lazy.png");

dogImg = loadImage("dogImg.png");
dogImg1 = loadImage("dogImg1.png");
}

function setup()
{
    database=firebase.database();
    createCanvas(400,500);

    foodObj = new food();
    dog = createSprite(200,400,10,10);
    dog.addImage(dogImg);
    dog.scale = 0.15;

     foodStock=database.ref('Food');
     foodStock.on("value",readStock);

    lastFed=database.ref('FeedTime')  
    lastFed.on("value",function(data) {
        lastFed=data.val();
    })

    readState=database.ref('GameState');
    readState.on("value",function(data) {
        GameState=data.val();
    })

   
    
    feed=createButton("Feed the dog");
    feed.position(500,65);
    feed.mousePressed(feedDog);
    addFood=createButton("Add Food");
    addFood.position(600,65);
    addFood.mousePressed(addFoods);

}

function draw()
{
    background(46, 139, 87);
    

    

    currentTime=hour();
    if (currentTime==(lastFed+1))
    {
        update("Playing");
        foodObj.garden();
    }else if (currentTime==(lastFed+2))
    {
        update("Sleeping");
        foodObj.bedroom();
    }else if (currentTime>(lastFed+2) && currentTime<=(lastFed+4)) 
    {
        update("Bathing");
        foodObj.washroom();
    }else{
        update("Hungry");
        foodObj.display();
    }

    if (GameState!="Hungry") 
    {
        feed.hide();
        addFood.hide();
        dog.remove();
    }else
    {
        feed.show();
        addFood.show();
        dog.addImage(dogImg);
    }
   
    drawSprites();

    

    
    

   
    // text("Remaining Food :" +foodStock ,180,200)
   
   

}

function readStock(data) { 
     foodS=data.val();
    foodStock=data.val();    
}

function writeStock(x)
{
  if (x<=0) 
  {
      x = 0;
  }else
  {
      x = x-1;
  }
  database.ref('/').update
   ({
       Food : x 
   })
}

function feedDog()
{
    dog.addImage(dogImg1);
    if(foodS>0)
    {
        foodS-=1
    }
     database.ref('/').update({
     Food:foodS
     })
    foodObj. updateFoodStock(foodObj.deductFood());
    database.ref('/').update({
        Food:foodObj.deductFood(),
        
       
        
    })
    
}

    function addFoods()
     {
        foodS++;
          
         database.ref('/').update({
             Food:foodS
            
         })
   foodObj. updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
        Food:foodObj.getFoodStock(),
        
        
    })
    
    }
    
function update(state) 
{
    database.ref('/').update({
        GameState:state
    });
}
