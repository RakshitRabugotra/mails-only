import React, { useState } from "react"
import { Alert, ScrollView, StyleSheet, View } from "react-native"
import { Card, Button, Text, Title, Subheading, Chip } from "react-native-paper"
import { Colors } from "../../constants/Colors"

// Placeholder users data (JSON)
const users = [
  {
    firstName: "Anjali",
    lastName: "Sharma",
    occupation: "Software Engineer",
    age: 29,
    locality: "Dwarka",
  },
  {
    firstName: "Priya",
    lastName: "Verma",
    occupation: "Teacher",
    age: 35,
    locality: "Vasant Kunj",
  },
  {
    firstName: "Neha",
    lastName: "Gupta",
    occupation: "Doctor",
    age: 32,
    locality: "Rohini",
  },
  {
    firstName: "Komal",
    lastName: "Singh",
    occupation: "Journalist",
    age: 27,
    locality: "Karol Bagh",
  },
  {
    firstName: "Aarti",
    lastName: "Mehta",
    occupation: "Architect",
    age: 31,
    locality: "Connaught Place",
  },
  {
    firstName: "Ritika",
    lastName: "Malhotra",
    occupation: "Entrepreneur",
    age: 28,
    locality: "Saket",
  },
  {
    firstName: "Pooja",
    lastName: "Reddy",
    occupation: "Lawyer",
    age: 34,
    locality: "Hauz Khas",
  },
  {
    firstName: "Simran",
    lastName: "Kaur",
    occupation: "Marketing Manager",
    age: 26,
    locality: "Lajpat Nagar",
  },
  {
    firstName: "Madhuri",
    lastName: "Yadav",
    occupation: "Nurse",
    age: 30,
    locality: "Paharganj",
  },
  {
    firstName: "Isha",
    lastName: "Choudhary",
    occupation: "Content Writer",
    age: 24,
    locality: "Mayur Vihar",
  },
]

const occupations = [
  "Teacher",
  "Doctor",
  "Software Engineer",
  "Journalist",
  "Architect",
  "Entrepreneur",
  "Lawyer",
  "Marketing Manager",
  "Nurse",
  "Content Writer",
]

export default function CommunityPage() {
  const [selectedOccupation, setSelectedOccupation] = useState<string | null>(
    null
  )

  const handleOccupationFilter = (occupation: string) => {
    setSelectedOccupation(selectedOccupation === occupation ? null : occupation)
  }

  // Group users by occupation
  const groupedUsers = users.reduce((acc, user) => {
    const { occupation } = user
    if (!acc[occupation]) {
      acc[occupation] = []
    }
    acc[occupation].push(user)
    return acc
  }, {} as { [key: string]: any[] })

  return (
    <ScrollView style={styles.container}>
      <Subheading style={styles.subtitle}>
        Interact with others in the community
      </Subheading>

      {/* Chips for Filtering by Occupation */}
      <View style={styles.chipContainer}>
        {occupations.map(occupation => (
          <Chip
            key={occupation}
            selected={selectedOccupation === occupation}
            onPress={() => handleOccupationFilter(occupation)}
            style={[
              styles.chip,
              {
                backgroundColor:
                  selectedOccupation === occupation
                    ? Colors.primary[600]
                    : "#e0e0e0",
              },
            ]}
          >
            {occupation}
          </Chip>
        ))}
        <Chip
          key="all"
          selected={selectedOccupation === null}
          onPress={() => setSelectedOccupation(null)}
          style={[
            styles.chip,
            {
              backgroundColor:
                selectedOccupation === null ? Colors.primary[600] : "#e0e0e0",
            },
          ]}
        >
          All
        </Chip>
      </View>

      {/* Displaying Users Grouped by Occupation */}
      {Object.keys(groupedUsers).map(occupation => {
        if (selectedOccupation && selectedOccupation !== occupation) return null

        return (
          <View key={occupation}>
            <Text style={styles.sectionTitle}>{occupation}</Text>
            {groupedUsers[occupation].map((user, index) => (
              <Card key={index} style={styles.card}>
                <Card.Content>
                  <Text style={styles.userName}>
                    {user.firstName} {user.lastName}
                  </Text>
                  <Text>{user.occupation}</Text>
                  <Text>Age: {user.age}</Text>
                  <Text>Locality: {user.locality}</Text>
                </Card.Content>
                <Card.Actions
                  style={{
                    padding: 0,
                    paddingVertical: 12,
                    flexDirection: "row-reverse",
                  }}
                >
                  <Button
                    mode="contained"
                    onPress={() =>
                      Alert.alert(`Get Help request sent to ${user.firstName}`)
                    }
                    style={styles.button}
                    labelStyle={{ fontSize: 12 }}
                  >
                    Get Help
                  </Button>
                  <Button
                    mode="contained"
                    onPress={() =>
                      Alert.alert(
                        `Suggest Help request sent to ${user.firstName}`
                      )
                    }
                    style={styles.button}
                    labelStyle={{ fontSize: 12 }}
                  >
                    Suggest Help
                  </Button>
                  <Button
                    mode="contained"
                    onPress={() =>
                      Alert.alert(`Contact request sent to ${user.firstName}`)
                    }
                    style={styles.button}
                    labelStyle={{ fontSize: 12 }}
                  >
                    Contact
                  </Button>
                </Card.Actions>
              </Card>
            ))}
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  subtitle: {
    color: "#3d3d3d",
    textAlign: "left",
    marginBottom: 10,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  chip: {
    margin: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#3d3d3d",
    fontWeight: "bold",
    marginVertical: 10,
    textDecorationLine: "underline",
  },
  card: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    flex: 0,
  },
})
