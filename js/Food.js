class food 
{

    constructor()
    {
      this.foodStock=0; 
      this.lastFed;
      this.image = loadImage("Milk.png");
    }

     updateFoodStock()
    {
       this.foodStock=foodStock;
    }

     getFedTime(lastFed)
    {
        this.lastFed=lastFed;
    }

     deductFood()
    {
        if(foodStock>0)
        {
            this.foodStock;
            
        }
    }


    getFoodStock()
    {
        return this.foodStock;
    }

    display()
    {
        fill(255,255,254);
    textSize(15);

    lastFed=hour()
    if(lastFed>=12)
    {
        text("Last Feed :"+ lastFed%12 + "PM",20,30);
    }else if(lastFed==0)
    {
        text("Last Feed : 12 AM",20,30);
    }else
    {
        text("Last Feed :"+lastFed + "AM", 20, 30);
    }


        var x=40,y=20;


        if (this.foodStock!=0) 
        {
            for(var i=0;i<this.foodStock;i++)
            {
                if(i%10==0)
                {
                    x=40;
                    y=y+50;
                }
                image(this.image,x,y,60,60);
                x=x+30;
            }
        }
    }

    bedroom()
    {
        background(bedroom,550,500);
    }

    garden()
    {
        background(garden,550,500);
    }   

    washroom()
    {
        background(washroom,550,500)
    }
}  