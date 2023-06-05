function getTimeElapsed(createdAt) {
    const dateCreated = new Date(createdAt)
    const now = new Date()
    const timeElapsed = now - dateCreated
    const minutes = Math.floor(timeElapsed / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
  
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    }
  }   

  const getInitials = (name) => {
    const words = name.split(' ');
    const initials = words.map((word) => word.charAt(0).toUpperCase());
    return initials.join('');
  }
  
  function generateColors(deepOrange, deepPurple, blue){
    const randomColor = [deepOrange, deepPurple, blue][Math.floor(Math.random() * 3)][Math.floor(Math.random() * 9) * 100];
    return randomColor;
  }

  export {getTimeElapsed, getInitials, generateColors}