import gsap from 'gsap';

export const animateOnLoad = () => {
  const timeline = gsap.timeline();

  timeline
    .from(".product-img", {
      duration: 1,
      x: -100,
      opacity: 0,
    })
    .from("nav", {
      duration: 0.5,
      y: -50,
      opacity: 0,
    }, "-=0.5")
    .from(".product-details", {
      duration: 0.8,
      opacity: 0,
      y: 30,
    }, "-=0.3")
    .from(".size-selector", {
      duration: 0.8,
      opacity: 0,
      y: 30,
    }, "-=0.3")
    .from(".other-products", {
      duration: 0.8,
      opacity: 0,
      y: 30,
    }, "-=0.3");
};

export const animateImageChange = (mainImageRef: React.RefObject<HTMLImageElement>, image: string, setMainImage: (image: string) => void) => {
  if (mainImageRef.current) {
    gsap.to(mainImageRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setMainImage(image);
        gsap.to(mainImageRef.current, {
          opacity: 1,
          duration: 0.3,
        });
      },
    });
  } else {
    setMainImage(image);
  }
};

export const animateSizeSelect = (size: string) => {
  gsap.fromTo(
    `.size-btn[data-size="${size}"]`,
    { scale: 0.9 },
    { scale: 1, duration: 0.3, ease: "back.out" }
  );
};

// export const animateAddToCart = (cartCountRef: React.RefObject<HTMLSpanElement>) => {
//   if (cartCountRef.current) {
//     gsap.fromTo(
//       cartCountRef.current,
//       { scale: 1.5, color: "#ff9900" },
//       { scale: 1, color: "inherit", duration: 0.4, ease: "elastic.out" }
//     );
//   }

//   gsap.fromTo(
//     ".add-to-cart",
//     { scale: 0.95 },
//     { scale: 1, duration: 0.3, ease: "back.out" }
//   );
// };