<script>
</script>

<style>
  label {
    line-height: calc(var(--size, 4em) / 4);
  }
  input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }
  span {
    display: grid;
    background-color: var(--color-primary);
    cursor: pointer;
    padding: calc(var(--size, 4em) / 8);
    transition: 0.2s;
    margin-left: calc(var(--size, 4em) / 8);
    margin-right: calc(var(--size, 4em) / 8);
  }
  span::before {
    transition: 0.2s;
    background: var(--bg-secondary);
    mask: var(--offImage, none) no-repeat center exclude, repeating-linear-gradient(black, white); /* Doesn't matter what the gradient is set to */
    display: grid;
    align-content: center;
    justify-content: center;
    content: var(--offText, "");
    height: calc(var(--size, 4em) / 4);
    width: calc(var(--size, 4em) / 4);
    font-size: calc(var(--size, 4em) / 4);
    font-family: "Liberation Sans", "Helvetica Neue", "Noto Sans", "Open Sans", sans-serif;
    padding: calc(var(--size, 4em) / 8); /* Should be 2x width/height */
    margin: 0 calc(var(--size, 4em) / 2) 0 0;
  }
  input:checked + span {
    background-color: var(--color-highlight);
  }
  input:checked + span::before {
    mask: var(--onImage, none) no-repeat center exclude, repeating-linear-gradient(black, white);
    content: var(--onText, "");
    margin: 0 0 0 calc(var(--size, 4em) / 2);
    font-family: var(--onFont)
  }
</style>

<label>
  <input type="checkbox" role="switch"/>
  <span></span>
</label>