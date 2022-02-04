const fs = require ('fs');

// to read the file 
fs.readFile('./document.txt', (err , data )=>
{
    if (err){
        console.log(err);
    }
    console.log(data.toString());
});

console.log('This will execute faster');


// write to file

fs.writeFile ('./document.txt', 'This is second line', ()=>
{
    console.log("File was written");
});
// if file name does not exist it will crearte the new file



// directories

// by this one run will create file and other will remove the file
if (!fs.existsSync('./assets'))
{
fs.mkdir('./assets', (err) =>
{
    if(err)
    {
        console.log(err);
    }
    console.log('Folder created');

} )
}else {
    fs.rmdir('./assets', (err) =>
    {
        if(err)
        {
            console.log(err);
        }
        console.log('File removed');
    })

}
 


// deletetion of file
if (fs.existsSync('./delete.txt'))
{
    fs.unlink('./delete.txt',(err) =>
    {
        if (err){
           console.log(err); 
        }
        console.log('File deleted');
    })

}