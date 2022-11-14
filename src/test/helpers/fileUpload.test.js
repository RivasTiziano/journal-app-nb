import { fileUpload } from "../../helpers/fileUpload"

describe('Tests in fileUpload.test.js', () => {

    test('should ', async ()  => {

        const imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');
<<<<<<< HEAD

        //asdasa
=======
<<<<<<< HEAD
        
        //elchisi
=======
 
>>>>>>> 36ae05ab957dec4a66e9fde0b0409c7aa34c0600
>>>>>>> 062efe4a732b19af345f210bab5e002d23dd881a
    })

})
