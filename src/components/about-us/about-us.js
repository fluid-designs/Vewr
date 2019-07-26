import React, { Fragment } from 'react';

export default function AboutUs() {
  return (
    <Fragment>
      <div id="AboutUs" className="component-container">
        <h1>Fluid Design</h1>
        <p>
          Fresh as the spring rain. Churning and thrashing as rapids. Swift as
          the stream. Patient as glacial runoff. Cool as the winter snow.
          Amorphous and changeable throughout. We are Fluid Design.
        </p>
        <hr />
        <img
          src="https://avatars.dicebear.com/v2/bottts/janehur.svg"
          alt="Jane"
        />
        <h2>Jane Hur</h2>
        <p>
          A spellcaster born in the Land of the Winds that trained with the Great
          Lake Ancients, she still practices the old ways, hexing code into any
          shape imaginable and likely the one that most amuses her. Rightly
          feared by the Council of Guardians for the power of her code magic,
          she can bend any code base to her will.
        </p>
        <a href="https://github.com/janiekyu">
          <i className="fab fa-github">Github</i>
        </a>
        <hr />
        <img
          src="https://avatars.dicebear.com/v2/bottts/brandonhurrington.svg"
          alt="Brandon"
        />
        <h2>Brandon Hurrington</h2>
        <p>
          Sellsword. Mercenary. Opportunist. And these are the kind things said of this man with a shrouded past. A person of few words and no attachments, he prefers the periphery of the crowd to best line up an attack on a problem set or offer a scathing observation of algorithmic efficiency. Though he has been involved in all of the greatest coding challenges and hackathons of the last half century he has somehow managed to always escape unscathed.{' '}
        </p>
        <a href="https://github.com/Kai-ros">
          <i className="fab fa-github">Github</i>
        </a>
        <hr />
        <img
          src="https://avatars.dicebear.com/v2/bottts/melfiperez.svg"
          alt="Melfi"
        />
        <h2>Melfi Perez</h2>
        <p>
          A fallen elven ranger hailing from the Far Coast, though committed to upholding the rule of law her aims may be more nefarious than they seem. Her pinpoint accuracy can land a shot on any bug at ranges that would otherwise seem impossible. Her arcane powers of deployment and configuration are not to be second to none, sadly it would be a vain hope that she uses them for good.{' '}
        </p>
        <a href="https://github.com/perezm27">
          <i className="fab fa-github">Github</i>
        </a>
        <hr />
        <img
          src="https://avatars.dicebear.com/v2/bottts/mattstuhring.svg"
          alt="Matt"
        />
        <h2>Matt Stuhring</h2>
        <p>
          Durable, boisterous, and dependable, this dwarven berserker is the kindest soul you could ever meet off of the field of development, but when he erupts into a coding furor no logical obstacles can withstand his onslaught. Can frequently be found training late into the night on the perfect stroke of his mighty battle axe, Code Slayer.{' '}
        </p>
        <a href="https://github.com/mattstuhring">
          <i className="fab fa-github">Github</i>
        </a>
      </div>
    </Fragment>
  );
}