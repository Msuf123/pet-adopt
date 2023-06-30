import React, { useEffect, useState } from 'react';
import { getPets } from '../../api/petfinder';
import Hero from '../../components/hero';
import { Link, useParams } from 'react-router-dom';

// import useParams
// import Link

const HomePage = () => {
  const ans=useParams()
  const [data, setData] = useState(null);
  const type = ans.type; // Fix me!

  useEffect(() => {
    async function getPetsData() {
      const petsData = await getPets(type);
      setData(petsData);
    }

    getPetsData();
  }, [type]);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="page">
      <Hero />
      <h3>
        <span className="pet-type-label">{type ? `${type}s` : 'Pets'}</span>{' '}
        available for adoption near you
      </h3>

      {data.length ? (
        <div className="grid">
          {data.map((animal) => (
            <Link to={`/${animal.type.toLowerCase()}/${animal.id}`}// Change me to a Link!
              key={animal.id}
              
              className="pet"
            >
              <article>
                <div className="pet-image-container">
                  {
                    <img
                      className="pet-image"
                      src={
                        animal.photos[0]?.medium ||
                        '/missing-animal.png'
                      }
                      alt=""
                    />
                  }
                </div>
                <h3>{animal.name}</h3>
                <p>Breed: {animal.breeds.primary}</p>
                <p>Color: {animal.colors.primary}</p>
                <p>Gender: {animal.gender}</p>
              </article>
            </Link> // Don't forget to change me!
          ))}
        </div>
      ) : (
        <p className="prompt">No {type}s available for adoption now.</p>
      )}
    </div>
  );
};

export default HomePage;