// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite( bgImg, fgImg, fgOpac, fgPos )
{
    // console.log(fgImg.height);
    // console.log(fgImg.width);
    
    //var fgH = 0;



    for(var foreground_height = 0;foreground_height <fgImg.height; foreground_height++ )
    {
        for(var foreground_width = 0;foreground_width <fgImg.width; foreground_width++ )
        {
        
           if(foreground_width + fgPos.x<0||foreground_width + fgPos.x>bgImg.width) {continue;}
           if(foreground_height + fgPos.y<0||foreground_height + fgPos.y>bgImg.height) {continue;}
           
           var bgColorArray = getColorIndicesForCoord(foreground_width + fgPos.x,foreground_height+fgPos.y,bgImg.width);
           var fgColorArray = getColorIndicesForCoord(foreground_width,foreground_height,fgImg.width);

            //noramlize fgOpac
            var oneminusalpha = (1-((fgImg.data[fgColorArray[3]]/255) * fgOpac));

            //dividend
            var dividend = ((fgImg.data[fgColorArray[3]]/255) * fgOpac) + ((bgImg.data[bgColorArray[3]]/255) * oneminusalpha);
            //red
            bgImg.data[bgColorArray[0]] =  ((((fgImg.data[fgColorArray[3]]/255) * fgOpac) * fgImg.data[fgColorArray[0]]) + (bgImg.data[bgColorArray[0]] * oneminusalpha * (bgImg.data[bgColorArray[3]]/255))) / dividend;
            //green
            bgImg.data[bgColorArray[1]] =  ((((fgImg.data[fgColorArray[3]]/255) * fgOpac) * fgImg.data[fgColorArray[1]]) + (bgImg.data[bgColorArray[1]] * oneminusalpha * (bgImg.data[bgColorArray[3]]/255))) / dividend;
            //blue
            bgImg.data[bgColorArray[2]] =  ((((fgImg.data[fgColorArray[3]]/255) * fgOpac) * fgImg.data[fgColorArray[2]]) + (bgImg.data[bgColorArray[2]] * oneminusalpha * (bgImg.data[bgColorArray[3]]/255))) / dividend;
            
        }
    }
}

/*Copied functions from https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas */
function getColorIndicesForCoord(x, y, width) {
    var red = y * (width * 4) + x * 4;
    return [red, red + 1, red + 2, red + 3];
  }
