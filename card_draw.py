# Fixed Python program to draw five random cards from a shuffled deck

import itertools
import random

# make a deck of cards
deck = list(itertools.product(range(1, 14), ['Spade', 'Heart', 'Diamond', 'Club']))

# shuffle the cards
random.shuffle(deck)

# draw five cards
print("You got:")
for i in range(5):
    rank = deck[i][0]
    suit = deck[i][1]
    print(f"{rank} of {suit}")
