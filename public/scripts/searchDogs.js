const dogsView = (dogs) => `
<div class="col-12">
    <div class="card">
        <h5 class="card-header"> ${dogs.Dog_name}</h5>
        <div class="card-body">
          <ul class="list-group">
               <li class="list-group-item">Origin: ${dogs.Origin}</li>
                <li class="list-group-item">Fur color: ${dogs.Fur}</li>
                <li class="list-group-item">Height: ${dogs.Height}</li>
                <li class="list-group-item">Color of Eyes: ${dogs.Color}</li>
                <li class="list-group-item">Longevity: ${dogs.Longevity}</li>
                <li class="list-group-item">Traits: ${dogs.Traits}</li>
                <li class="list-group-item">Common Health Problems: ${dogs.Health_Problems}</li>
          </ul>
        </div>
      </div>
 </div>
`;


const handleClick = async () => {
    const searchDogsVal = document.querySelector("#searchInput").value;
    const dogsDomRef = document.querySelector('#dogsItems')

    try {

        const ref = await fetch(`/api/searched-dogs/?search=${searchDogsVal}`);
        const searchResults = await ref.json();
        let dogsHtml = [];
        searchResults.forEach(dogs => {
            dogsHtml.push(dogsView(dogs));
        });
        dogsDomRef.innerHTML = dogsHtml.join("");
    } catch (e) {
        console.log(e);
        console.log('could not search api');
    }

}