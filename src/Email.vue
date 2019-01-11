<template>
<div>
  <table>
    <tr>
      <td>From</td>
      <td>{{ from }}</td>
    </tr>
    <tr>
      <td>To</td>
      <td>{{ to }}</td>
    </tr>
  </table>
  <h6>Content</h6>
  <div>
    {{ body }}
  </div>
</div>
</template>

<script>
module.exports = {
    data: function () {
        return {
            from: 'example@example.com',
            to: 'example@example.com',
            body: 'Email contents...'
        }
    }
}
</script>
