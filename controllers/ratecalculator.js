exports.calculatorDeliveryMotorAngkas = (req, res) =>{

  // const { longLatKM } = req.body;

  const slug = req.params.slug.toLowerCase();
    console.log(slug)

  const price = 50;

  if(slug > 2){ 
    const lastprice = slug * 10 + 50 

    return res.json({
      lastprice
    })

  }else{
    lastprice = price

    return res.json({
      lastprice
    })
  }

}


exports.calculatorDeliveryMotorLalamove = (req, res) =>{

  // const { longLatKM } = req.body;

  const slug = req.params.slug.toLowerCase();


    const lastprice = slug * 5 + 50 

    return res.json({
      lastprice
    })

}


exports.calculatorDeliveryMotorMrSpeedy = (req, res) =>{

  // const { longLatKM } = req.body;

  const slug = req.params.slug.toLowerCase();


    const lastprice = slug * 5 + 10 

    return res.json({
      lastprice
    })

}


exports.calculatorDeliveryMotorGrab= (req, res) =>{

  // const { longLatKM } = req.body;

  const slug = req.params.slug.toLowerCase();


    const lastprice = slug * 10 + 45

    return res.json({
      lastprice
    })

}



exports.calculatorDeliveryMotortoktok= (req, res) =>{

  // const { longLatKM } = req.body;


  const slug = req.params.slug.toLowerCase();
    console.log(slug)

  const price = 60;

  if(slug > 1){ 
    const lastprice = slug * 6 + 60 

    return res.json({
      lastprice
    })

  }else{
    lastprice = price

    return res.json({
      lastprice
    })
  }
}

exports.calculatorGrabCar= (req, res) =>{

  // const { longLatKM } = req.body;


  const slug = req.params.slug.toLowerCase();
    console.log(slug)

  const price = 60;

  if(slug > 1){ 
    const lastprice = slug * 20 + 60 

    return res.json({
      lastprice
    })

  }else{
    lastprice = price

    return res.json({
      lastprice
    })
  }
}

exports.calculatorAngkasRide= (req, res) =>{

  // const { longLatKM } = req.body;


  const slug = req.params.slug.toLowerCase();
    console.log(slug)

  const price = 50;

  if(slug > 2){ 
    const lastprice = slug * 10 + 50 

    return res.json({
      lastprice
    })

  }else{
    lastprice = price

    return res.json({
      lastprice
    })
  }
}


exports.calculatorKeriRide = (req, res) =>{

  // const { longLatKM } = req.body;


  const slug = req.params.slug.toLowerCase();
    console.log(slug)

  const price = 50;

  if(slug > 2){ 
    const lastprice = slug * 6 + 50 

    return res.json({
      lastprice
    })

  }else{
    lastprice = price

    return res.json({
      lastprice
    })
  }
}



exports.calculatorKeriPabili = (req, res) =>{

  // const { longLatKM } = req.body;


  const slug = req.params.slug.toLowerCase();
    console.log(slug)

  const price = 45;

  if(slug > 2){ 
    const lastprice = slug * 6 + 50 

    return res.json({
      lastprice
    })

  }else{
    lastprice = price

    return res.json({
      lastprice
    })
  }
}


exports.calculatorKeriPapila = (req, res) =>{

  // const { longLatKM } = req.body;


  const slug = req.params.slug.toLowerCase();
    console.log(slug)

  const price = 63;

  if(slug > 2){ 
    const lastprice = slug * 6 + 50 

    return res.json({
      lastprice
    })

  }else{
    lastprice = price

    return res.json({
      lastprice
    })
  }
}


exports.calculatorProvider = (req, res) =>{
  const providerId = req.query.providerId;
  const distanceKm = req.query.distanceKm;
  const rate = req.query.rate;

if (providerId == 4){
  //const price = 63;
  console.log("tite")
  console.log(rate)
  if(distanceKm > 2){ 
    const lastprice = distanceKm * 6 + 50 
  
    return res.json({
      lastprice
    })
  
  }else{
    lastprice = rate
    
    return res.json({
      lastprice
    })
  }
} else if (providerId == 1){

    const lastprice = distanceKm * 5 + 10 

    return res.json({
      lastprice
    })

  } else if (providerId == 2){

    //const price = 50;

  if(distanceKm > 2){ 
  
    const lastprice = distanceKm * 6 + 50 

    return res.json({
      lastprice
    })

  }else{
    lastprice = rate

    return res.json({
      lastprice
    })
  }
}else if (providerId == 3){
  //const price = 45;

  if(distanceKm > 2){ 
    const lastprice = distanceKm * 6 + 50 

    return res.json({
      lastprice
    })

  }else{
    lastprice = rate

    return res.json({
      lastprice
    })
  }
}else if (providerId == 5){

  const lastprice = distanceKm * 5 + 50 
  return res.json({
    lastprice
  });

}else if (providerId == 6){

//const price = 60;

if(distanceKm > 1){ 
  const lastprice = distanceKm * 6 + 60 

  return res.json({
    lastprice
  })

}else{
  lastprice = price

  return res.json({
    lastprice
  })
}
  }else if (providerId == 7){

   // const price = 50;

    if(distanceKm > 2){ 
      const lastprice = distanceKm * 10 + 50 
  
      return res.json({
        lastprice
      })
  
    }else{
      lastprice = rate
  
      return res.json({
        lastprice
      })
    }
      }  else if (providerId == 8){
        //const price = 70;

  if(distanceKm > 2){ 
    const lastprice = distanceKm * 10 + 50 

    return res.json({
      lastprice
    })

  }else{
    lastprice = rate

    return res.json({
      lastprice
    })
  }

      }else if (providerId == 9){
        //const price = 60;

        if(distanceKm > 1){ 
          const lastprice = distanceKm * 20 + 60 
      
          return res.json({
            lastprice
          })
      
        }else{
          lastprice = rate
      
          return res.json({
            lastprice
          })
        }
      }



}