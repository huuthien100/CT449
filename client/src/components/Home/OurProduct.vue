<template>
  <div class="story w-[95%] lg:w-[65%] mx-auto mb-12">
    <div class="flex flex-col lg:flex-row justify-center items-center gap-4">
      <div class="basis-1/2">
        <video
          autoplay
          muted
          loop
          class="w-full rounded-md object-cover max-h-[370px]"
        >
          <source src="../../assets/videos/pizza.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="text-center lg:text-left basis-1/2 lg:pl-8">
        <div
          class="text-2xl font-medium mb-4 capitalize leading-10 tracking-wide"
        >
          Our Pizza store are processed using modern techniques.
        </div>
        <div class="text-gray-500 leading-7 mb-6">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
          modi, minima fuga delectus cum fugiat illum error voluptatum,
          molestias corporis libero esse quod amet maxime. Harum sint rem
          reiciendis nemo! <br />Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Suscipit corrupti error tenetur vero nulla sed id,
          placeat minus. Aliquid exercitationem voluptates deleniti est veniam
          optio illum, minus dolorum ullam consequuntur?
        </div>
        <div class="">
          <router-link :to="{ name: 'Home', params: {} }">
            <span
              href=""
              class="text-coffee-400 uppercase pb-2 hover:text-coffee-600 text-base relative after:bg-coffee-200 hover:after:bg-coffee-600 after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:transition-all after:duration-700 after:ease-in-out"
            >
              See how to make
            </span></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
